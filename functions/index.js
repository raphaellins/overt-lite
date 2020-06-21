const functions = require('firebase-functions');
const cors = require('cors');

const app = require('express')();

const auth = require('./util/auth');
const {listLoteries} = require('./api/lottery')
const { loginUser, getUserDetail, signUpUser } = require('./api/users')

app.use(cors({ origin: true }));
 
 app.post('/login', loginUser);
 app.get('/loteries', auth, listLoteries);
 app.get('/user', auth, getUserDetail)
 app.post('/signup', signUpUser);

exports.api = functions.https.onRequest(app);

