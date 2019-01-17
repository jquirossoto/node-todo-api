const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var todoId = '5c2e98314707e8201733d69d';

// if(!ObjectId.isValid(id)){

// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos.', todos);
// });

// Todo.findOne({_id: id}).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(todoId).then((todo) => {
//     if(!todo) return console.log('Id not found');

//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

var userId = '5c2e7ad9fe0f3c66cf3d55b5';

if (!ObjectID.isValid(userId)) return console.log('User id is invalid');

User.findById(userId).then((user) => {
    if (!user) return console.log('User not found');
    console.log('User found', user);
}, (e) => {
    console.log(e);
}).catch((e) => {
    console.log(e);
});