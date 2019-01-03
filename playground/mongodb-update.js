// const MongoClient = require('mongodb').MongoClient;
//object destructuring same as above
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate(
    // {
    //     _id: new ObjectID("5c253954a3c1bccf599de78b")
    // }, {
    //     $set: {completed: true}
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectID("5c252dd78e9477624a26c461")
        },{
            $set: {
                name: 'jquirossoto'
            },
            $inc: {
                age: 1
            }
        },{
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    });

    // client.close();
});