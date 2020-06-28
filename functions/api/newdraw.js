const { db } = require('../util/admin');

exports.postNewDraw = async (request, response) => {
    if (request.body == null) {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    const { drawNumber, numbersDrawn, drawDate } = request.body;

    if (drawDate == null) {
        return response.status(400).json({ drawDate: 'Must not be empty' });
    }

    if (drawNumber == null) {
        return response.status(400).json({ gameNumber: 'Must not be empty' });
    }

    if (numbersDrawn == null) {
        return response.status(400).json({ numbersDrawn: 'Must not be empty' });
    }

    if (drawNumber <= 0) {
        return response.status(400).json({ gameNumber: 'Need to be greather than 0' });
    }

    if (numbersDrawn.length < 15) {
        return response.status(400).json({ numbersDrawn: 'Inform at last 15 numbers' });
    }

    const newDraw = {
        drawNumber,
        drawDate,
        numbersDrawn
    }

    matchDrawAndGame(newDraw);

    const document = await db.collection('draws').add(newDraw);

    return response.json({...newDraw, drawId: document.id});
};

matchDrawAndGame = (newDraw) => {

    db.collection("games").where("gameNumber", "==", newDraw.drawNumber)
        .get()
        .then(function(snapshot){

            snapshot.forEach(function(document){

                if(document.data().ballsMatched != null){
                    return;
                }

                const gameBalls = document.data().numbersPlayed;
                const ballsMatched = [];

                newDraw.numbersDrawn.forEach((ball) => {
                    if(gameBalls.some((gBall) => gBall == ball)){
                        ballsMatched.push(ball);
                    }
                });

                db.collection("games").doc(document.id).update({
                    numbersPlayed: document.data().numbersPlayed,
                    gameNumber: document.data().gameNumber,
                    ballsMatched: ballsMatched,
                    countMatched: ballsMatched.length
                });

                console.log(ballsMatched);
            })
        })
}

exports.getAllDraws = async (request, response) => {
    try {
        let draws = [];
        const drawList = await db.collection('draws').orderBy('drawNumber', 'desc').get();

        for (var drawIndex in drawList.docs) {
            const drawId = drawList.docs[drawIndex].id;
            const drawDone = drawList.docs[drawIndex].data();

            const draw = {
                drawId: drawId,
                drawNumber: drawDone.drawNumber,
                numbersDrawn: drawDone.numbersDrawn,
            };

            draws.push(draw);
        }

        return response.json(draws);
    } catch (error) {
        return response.status(500).json({ error: error });
    };
}

exports.deleteDraw = async (request, response) => {

    if (request.params == null) {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    const { drawId } = request.params;

    if (drawId == null) {
        return response.status(400).json({ drawId: 'Must not be empty' });
    }

    try {
        await db.collection('draws').doc(drawId).delete();

        return response.json({ result: `Draw Id: ${drawId} deleted` });
    } catch (error) {
        return response.status(500).json({ error: error });
    }
}