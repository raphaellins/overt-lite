const { db } = require('../util/admin');
var _ = require('lodash');

exports.postNewGame = async (request, response) => {
    if (request.body == null) {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    if (request.body.initialGameNumber == null) {
        return response.status(400).json({ initialGameNumber: 'Must not be empty' });
    }

    const { initialGameNumber, numbersPlayed, gameDescription } = request.body;
    let finalGameNumber = request.body.finalGameNumber;

    if (request.body.numbersPlayed == null) {
        return response.status(400).json({ numbersPlayed: 'Must not be empty' });
    }

    if (initialGameNumber > finalGameNumber) {
        return response.status(400).json({ error: 'The number games need to be increase' });
    }

    if (numbersPlayed.length < 15) {
        return response.status(400).json({ numbersPlayed: 'Inform at last 15 numbers' });
    }

    if (request.body.finalGameNumber == null) {
        finalGameNumber = initialGameNumber
    }

    let gamesSaved = [];
    let gameNumber = (initialGameNumber);

    for (; gameNumber <= finalGameNumber; gameNumber++) {
        const newGame = {
            gameNumber,
            gameDescription,
            numbersPlayed
        }

        await db.collection('games').add(newGame);
        gamesSaved.push(gameNumber);
    }

    return response.json(gamesSaved);
};

exports.listGames = async (request, response) => {
    try {
        let games = [];
        const gamesPlayed = await db.collection('games').orderBy('gameNumber', 'desc').get();
        const drawnFound = await db.collection('draws').get();

        for (var gameIndex in gamesPlayed.docs) {
            const gameId = gamesPlayed.docs[gameIndex].id;
            const gamePlayed = gamesPlayed.docs[gameIndex].data();

            let drawGame = {
                numbersDrawn: []
            };

            if (drawnFound.size > 0) {
                const drawMatch = _.findLast(drawnFound.docs, (document) => document.data().drawNumber == gamePlayed.gameNumber);

                if (drawMatch != null) {
                    drawGame = drawMatch.data();
                }
            }

            const game = {
                gameId: gameId,
                gameNumber: gamePlayed.gameNumber,
                numbersPlayed: gamePlayed.numbersPlayed,
                ballsMatched: gamePlayed.ballsMatched,
                countMatched: gamePlayed.countMatched,
                numbersDrawn: drawGame.numbersDrawn,
                gameDescription: gamePlayed.gameDescription
            };

            games.push(game);
        }

        return response.json(games);
    } catch (error) {
        return response.status(500).json({ error: error });
    };
}

exports.deleteGame = async (request, response) => {

    if (request.params == null) {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    const { gameId } = request.params;

    if (gameId == null) {
        return response.status(400).json({ gameId: 'Must not be empty' });
    }

    try {
        await db.collection('games').doc(gameId).delete();

        return response.json({ result: `Game Id: ${gameId} deleted` });
    } catch (error) {
        return response.status(500).json({ error: error });
    }
}

exports.getAllGames = async (request, response) => {
    try {
        let games = [];
        const gamesPlayed = await db.collection('games').orderBy('gameNumber', 'desc').get();

        for (var gameIndex in gamesPlayed.docs) {
            const gameId = gamesPlayed.docs[gameIndex].id;
            const gamePlayed = gamesPlayed.docs[gameIndex].data();

            const game = {
                gameId: gameId,
                gameNumber: gamePlayed.gameNumber,
                numbersPlayed: gamePlayed.numbersPlayed,
                gameDescription: gamePlayed.gameDescription
            };

            games.push(game);
        }

        return response.json(games);
    } catch (error) {
        return response.status(500).json({ error: error });
    };
}