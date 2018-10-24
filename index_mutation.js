var app = require('express')();
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var schema = graphql.buildSchema(`
    input MessageInput {
        content: String,
        auther: String
    }
    type Message {
        id: ID!
        content: String
        auther: String
    }
    type Query {
        getMessage(id: ID!): Message
    }
    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }
`);

class Message {
    constructor(id, {content, auther}) {
        this.id = id;
        this.content = content;
        this.auther = auther;
    }
}

var fakeDatabase = {}

var root = {
    getMessage: function({id}) {
        if (!fakeDatabase[id])
            throw new Error ('no message exists with id ' + id);
        return new Message(id, fakeDatabase[id]);
    },
    createMessage: function({input}) {
        var id = require('crypto').randomBytes(10).toString('hex');
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage: function({id, input}) {
        if (!fakeDatabase[id])
            throw new Error ('no message exists with id ' + id);
        fakeDatabase[id] = input;
        return new Message(id, input);
    }
};
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(3000, () => {
    console.log('Running on 3000');
});
