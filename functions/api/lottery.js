const { db } = require('../util/admin');

exports.listLoteries = (request, response) => {
    db
    .collection('loteries')
    .orderBy('draw_date', 'desc')
    .get()
    .then((data) => {
        let todos = [];
        data.forEach((doc) => {
            todos.push({
                lotteryId: doc.id,
                drawDate: doc.data().draw_date,
                drawNumber: doc.data().draw_number,
            });
        });
        return response.json(todos);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
}

exports.postLotery = (request, response) => {
	if (request.body.body.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
    }
    
    if(request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    
    const newTodoItem = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString()
    }
    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc)=>{
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};

exports.postBulkGame = (request, response) => {
	if (request.body.body.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
    }
    
    if(request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    
    const newTodoItem = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString()
    }
    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc)=>{
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};