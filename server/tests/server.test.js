const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) return done(err);
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a new todo with invalid body', (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

});


describe('GET /todos', () => {

    it('should get all todos', (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});


describe('GET /todos/:id', () => {

    it('should return todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });
 
    it('should return 404 for non object ids', (done) => {
        request(app)
            .get(`/todos/123Abc`)
            .expect(404)
            .end(done);
    });

});

describe('DELETE /todos/:id', () => {
    
    it('should delete a todo', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if(err) return done(err);
                Todo.findById(todos[0]._id).then((todo) => {
                    expect(todo).toBe(null);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 for todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .delete('/todos/123Abc')
            .expect(404)
            .end(done);    
    });

});

// describe('PATCH /todos/:id', () => {    

    // it('should update the todo', (done) => {
    //     var id = todos[0]._id;
    //     var body = {
    //         text: 'testtext',
    //         completed: true
    //     };
    //     request(app)
    //         .patch(`/todos/${id.toHexString()}`)
    //         .send(body)
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res.body.text).toBe(body.text);
    //             expect(res.body.completed).toBe(true);
    //             expect(res.body.completedAt).toBeA(Number);
    //         })
    //         .end(done);
    // });

//     it('should clear completedAt when todo is not completed', (done) => {
//         var id = todos[1]._id;
//         var body = {
//             text: 'testtext2',
//             completed: false
//         };
//         request(app)
//             .patch(`/todos/${id.toHexString()}`)
//             .send(body)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBeA(String).toBe(body.text);
//                 expect(res.body.completed).toBeA(Boolean).toBe(false);
//                 expect(res.body.completedAt).toBe(null);
//             })
//             .end(done);
//     });

// });

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    // it('should return 401 if not authenticated', (done) => {

    // });

    // describe('DELETE /users/me/token', () => {
    //     it('should delete authentication token', (done) => {
    //         request(app)
    //             .delete('/users/me/token')
    //             .set('x-auth', users[0].tokens[0].token)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 User.findById(users[0]._id).then((user) => {
    //                     expect(user.tokens.length).toBe(0);
    //                     done();
    //                 }).catch((e) => done(e));
    //             });
    //     });
    // });

});