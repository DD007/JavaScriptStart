const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

let todolist = [];
let theArrayIndex = function(index){
    this.index = index;
};
let editTheList ;

/* The to do list and the form are displayed */
app.get('/todo', function(req, res) {
    res.render('todo.ejs', {editTheList, todolist, clickHandler:"func1();" });
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list*/
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

.get('/todo/update/:id', function(req, res) {
    var editValue = todolist[req.params.id];
    if (req.params.id != '') {
        todolist.splice(req.params.id, 1);
        res.render('edit.ejs', { editValue, clickHandler:"func1();" });
    } else {
        res.redirect('/todo');
    }
})


/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);
