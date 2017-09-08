# Easy Modularization Scheme for Apollo-Server (Graphql)

This package allows you to do in an easy way the schema modularization for your server.

### Prerequisites

You need an apollo-server installation in your server and you need to put all your types in /schema/types and resolvers in /schema/resolvers

### Installing

It's simple. With npm:

```
npm install --save apolloems
```

### How to use

This package reads two folders. '/schema/resolvers/' and '/schema/types/'. So, you can generate automatically a Schema.

You can see the '/example' folder for more help. But it's easy to understand.

1. Install this package
2. In your server.js (or equivalent) require easy-modularization-scheme and call the functon ems to generate the schema

```
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express') ;
const { makeExecutableSchema } = require('graphql-tools');
const ems = require('easy-modularization-scheme')

const schema = makeExecutableSchema(ems());

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
```

3. You need to put all types in this way:

/schema/types/Author.js
```
const Post = `
type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}
`

const RootQuery = `
  posts: [Post]
`

const Mutation = `
  upvotePost (
    postId: Int!
  ): Post
`

const Type = () => [Post]
module.exports = {
  Type,
  RootQuery,
  Mutation
}
```

**The most important part is this.**
```
...
const Type = () => [Post]
module.exports = {
  Type,
  RootQuery,
  Mutation
}
```

You need to put in Type function ALL the types in the file. You can include several types. But for recommendation, one variable per type (If you want to declare a Type called Books for example, i suggest use const Book = `type Book ...`)

If you don't declare a RootQuery or Mutation you can avoid their declaration.

4. With the resolvers. You need to add in this way:
```
const { find, filter } = require('lodash');
// example data
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

module.exports = {
  RootQuery: {
    posts: () => posts
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  }
};
```

Use always RootQuery instead of Query.

5. Done! Run your server!

## Tests

Sorry. No test yet.

## History

V1.0.0 First version

## Todo

- [ ] Allow custom scalars
- [ ] Subscriptions
- [ ] Allow Comments in RootQuery and mutation

## License

This project is licensed under the MIT License

## Acknowledgments

* Apollo GraphQL staff
* My FullStack devs Facebook Group
* React Community
