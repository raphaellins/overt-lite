const functions = require('firebase-functions');
const cors = require('cors');

const app = require('express')();

const auth = require('./util/auth');
const {listLoteries} = require('./api/lottery')
const { loginUser, getUserDetail, signUpUser } = require('./api/users')
const {postNewGame, listGames} = require('./api/newgame');
const {postNewDraw} = require('./api/newdraw');

app.use(cors({ origin: true }));
 
 app.post('/login', loginUser);
 app.get('/loteries', auth, listLoteries);
 app.post('/new-draw', auth, postNewDraw);
 app.post('/new-game', auth, postNewGame);
 app.get('/games', auth, listGames);
 app.get('/user', auth, getUserDetail);
 app.post('/signup', signUpUser);

exports.api = functions.https.onRequest(app);

