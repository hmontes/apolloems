const Author = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }
`

const RootQuery = `
  author(id: Int!): Author
`

const Type = () => [Author]
module.exports = {
  Type,
  RootQuery
}