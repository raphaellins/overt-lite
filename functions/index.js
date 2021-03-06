const functions = require('firebase-functions');
const cors = require('cors');

const app = require('express')();

const auth = require('./util/auth');
const {listLoteries} = require('./api/lottery')
const { loginUser, getUserDetail, signUpUser } = require('./api/users')
const {postNewGame, listGames, deleteGame, getAllGames} = require('./api/newgame');
const {postNewDraw, getAllDraws, deleteDraw} = require('./api/newdraw');

app.use(cors({ origin: true }));
 
 app.post('/login', loginUser);
 app.get('/loteries', auth, listLoteries);
 app.post('/new-draw', auth, postNewDraw);
 app.get('/draws-all', auth, getAllDraws);
 app.delete('/draw/:drawId', auth, deleteDraw);
 app.post('/new-game', auth, postNewGame);
 app.delete('/game/:gameId', auth, deleteGame);
 app.get('/games', auth, listGames);
 app.get('/games-all', auth, getAllGames);
 app.get('/user', auth, getUserDetail);
 app.post('/signup', signUpUser);

exports.api = functions.https.onRequest(app);

