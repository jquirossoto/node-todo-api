const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//delete all docs from collection
//deprecated
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//delete all docs from collection
// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// });

//Other ways to delete docs
// Todo.findOneAndRemove({_id: '5c40dbb320355c49be3ee35f'}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove('5c40dbb320355c49be3ee35f').then((todo)=> {
//     console.log(todo);
// });