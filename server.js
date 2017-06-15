import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// we gotta import our models and routes
import Game from './app/models/game';
import { getGames, getGame, postGame, deleteGame } from './app/routes/games';

const app = express(); // out express server!
const port = process.env.PORT || 8080;

// DB connection through Mongoose
const options = {
	server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}; // just a bunch of options for the db connection

mongoose.Promise = global.Promise;
// Don't forget to substitute it with your connection string
mongoose.connect('mongodb://localhost/myapp', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// body parser and morgan middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// we tell express where to find static assets
app.use(express.static(__dirname + 'client/dist'));

// enable CORS  so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// API routes
app.route('/games')
	// create a game
	.post(postGame)
	// get all the games
	.get(getGames);
app.route('/games/:id')
	// get a single game
	.get(getGame)
	// delete a single game
	.delete(deleteGame);

// ...For all the other requests just sends back the Homepage
app.route('*').get((req, res) =>{
	res.sendFile('client/dist/index.html', { root: __dirname });
});

app.listen(port);

console.log(`listening on port ${port}`);