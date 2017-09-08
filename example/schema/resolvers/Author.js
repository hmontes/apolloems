const { find } = require('lodash');
// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

module.exports = {
  RootQuery: {
    author: (_, { id }) => find(authors, { id: id }),
  },
  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  },
};