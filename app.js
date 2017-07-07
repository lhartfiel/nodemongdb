const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');


const app = express();
const port = process.env.PORT || 3000;
const db = monk(process.env.MONGODB_URI || 'localhost/gameslocker');
const games = db.get('games');


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json());

var store = [];

app.get('/api/games', function(req, res, next){ //3 arguments: request, response and error
	games.find({})
	.then(function(games){
		res.json(games);
	})
	.catch(function(err){
		res.json(err);
	})
})

app.post('/api/games', function(req, res, next){
	games.insert(req.body)
	.then(function(game){
		res.json(game);
	})
	.catch(function(err){
		res.json(err)
	})
})

app.delete('/api/games/:id', function(req, res, next){
	var id = req.params.id;
	console.log(id);
	games.findOneAndDelete({_id: id})
		.then(function(){
			res.json({status: 'deleted'})
		})
		.catch(function(err){
			res.json(err);
		})
	
})

app.listen(port, function(){
	console.log(`api listening on port ${port}`);
})