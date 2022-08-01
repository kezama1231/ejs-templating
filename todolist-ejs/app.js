const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

console.log(date);

app.use(bodyParser.urlencoded({extended : true}));
app.use("/css", express.static('css'));
app.set('view engine', 'ejs');
let userItems = ["Watch Obi Wan", "Play Dota", "Get Jacked"];
let workItems = [];

app.get("/", function(request,response){
  let today = date.getDate();
  response.render('list',{
    listTitle : today,
    newItem : userItems});

});

app.post("/", function(request,response){
  //console.log(request.body);
  let userItem = request.body.newItem;
  if(request.body.list == 'Work'){
    workItems.push(userItem);
    response.redirect("/work");
  } else{
    userItems.push(userItem);
    response.redirect("/");
  }
});

app.get("/work" , function(request,response){
  response.render("list", {listTitle : "Work", newItem : workItems});
});

app.post("/work", function(request,response){
  let item = request.body.newItem;
  workItems.push(item);
  response.redirect("/work");
});

app.get("/about",function(request,response){
  response.render('about');
});



app.listen(3000,function(){
  console.log("Server has started listening on port 3000.");
})
