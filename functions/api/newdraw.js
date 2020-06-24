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