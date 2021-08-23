//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

var surrogatekey = 1;

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = surrogatekey++;
    req.body.status = "PEDING";
    tasks.push(req.body);
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.get('/tasks/:tasksId', function(req,res){
    const task = tasks.find(task => task.id = req.params.tasksId);
    if (task) {
        res.json(task);
    } else {
        res.sendStatus(404);
    } 
});

app.put('/tasks/:taskId', jsonParser, function(req,res){
    var task = tasks.find(task => task.id == req.params.taskId);
    task.title = req.body.title;
    task.detail = req.body.detail;

    if (task) {
        res.json(task);
    } else {
        res.status(404);
    }
});

app.delete('/tasks/:tasksId', function(req,res){
    var clean = tasks.findIndex(clean => clean.id == req.params.cleanId);

    console.log("clean" + clean);
    if (clean) {
        tasks.splice(clean);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});