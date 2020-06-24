const { db } = require('../util/admin');

exports.postNewGame = async (request, response) => {
    if (request.body == null) {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    const { drawNumber, numbersDrawn } = request.body;

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
        numbersDrawn
    }

    await db.collection('draws').add(newDraw);

    return response.json(newDraw);
};