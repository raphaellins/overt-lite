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

    const document = await db.collection('draws').add(newDraw);

    return response.json({...newDraw, drawId: document.id});
};