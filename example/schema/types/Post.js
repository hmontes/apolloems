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
