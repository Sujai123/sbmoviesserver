const express = require('express')
const unirest = require('unirest');
const cors = require('cors')
const bodyParser = require('body-parser')

let app=express();
let obj;

app.use(cors())
app.use(bodyParser.json())
let MovieName=""

app.post('/',(req,res)=>{
    MovieName=req.body.search
    let movies=[];
    let url="https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&r=json&s="+MovieName
    unirest.get(url)
    .header("X-RapidAPI-Host", "movie-database-imdb-alternative.p.rapidapi.com")
    .header("X-RapidAPI-Key", "73b748c31fmsh6c4c790ca972c45p1dc042jsn02ab7bf13666")
    .end(function (result) {
    obj=result.body;
    if(typeof(obj.Search)!="undefined"){
        obj.Search.map(movie=>{
            movies.push((movie))
        })
        res.send(movies)
    }
    else{
        res.status(400).json('cannot fetch the requested movie')
    }
    }); 
})

app.post('/movie',(req,res)=>{
    Movieid=req.body.search
    let url=`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${Movieid}&r=json`
    unirest.get(url)
    .header("X-RapidAPI-Host", "movie-database-imdb-alternative.p.rapidapi.com")
    .header("X-RapidAPI-Key", "73b748c31fmsh6c4c790ca972c45p1dc042jsn02ab7bf13666")
    .end(function (result) {
    res.send(result.body);
    });
})

app.listen(3001,()=>{
    console.log('port started at 3001')
})