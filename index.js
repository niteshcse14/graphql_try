var graphql = require('graphql');
var app = require('express')();
var graphqlHTTP = require('express-graphql');
var schema = new graphql.buildSchema(`
    type Query {
        course(id: Int!): [Course]
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: '1 JavaScript: Understanding The Weird Parts',
        author: '1 Anthony Alicea',
        description: '1 An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: '1 https://codingthesmartway.com/courses/understand-javascript/'
    },
    {
        id: 3,
        title: '2 JavaScript: Understanding The Weird Parts',
        author: '2 Anthony Alicea',
        description: '2 An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: '2 https://codingthesmartway.com/courses/understand-javascript/'
    }
]

var getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    });
}
var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

var root = {
    course: getCourse,
    courses: getCourses
};

app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('running on port 3000');
});
