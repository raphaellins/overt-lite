const { db } = require('../util/admin');

exports.postNewGame = async (request, response) => {
    if (request.body == null) {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    if (request.body.initialGameNumber == null) {
        return response.status(400).json({ initialGameNumber: 'Must not be empty' });
    }

    const { initialGameNumber, numbersPlayed } = request.body;
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
            numbersPlayed
        }

        await db.collection('games').add(newGame);
        gamesSaved.push(gameNumber);
    }

    return response.json(gamesSaved);
};

exports.listGames = async (request, response) => {
    try {
        const data = await db.collection('games').orderBy('gameNumber', 'desc').get();

        //TODO separete the result from gamesMatched from others
        //TODO gamesMatched will be ordered by gameNumber desc
        //TODO the others will be ordered by gameNumber asc
        //INSTALL lodash

        let games = [];
        data.forEach((doc) => {
            games.push({
                gameId: doc.id,
                gameNumber: doc.data().gameNumber,
                numbersPlayed: doc.data().numbersPlayed,
            });
        });

        return response.json(games);
    } catch (error) {
        return response.status(500).json({ error: error.code });
    };
}