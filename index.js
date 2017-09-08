const { merge } = require('lodash')
const glob = require('glob')
const path = require('path')

module.exports = function modulateSchema() {
  // Types
  var RootQueryMap = ''
  var MutationMap = ''
  var TypeMap = []
  var ResolverMap = {}

  // Import types
  glob.sync('schema/types/**/*.js').forEach( function (file) {
    var { Type, RootQuery, Mutation } = require( path.resolve (file))
    if (RootQuery) RootQueryMap = RootQueryMap + RootQuery
    if (Mutation) MutationMap = MutationMap + Mutation
    TypeMap.push(Type)
  })

  // Import resolvers
  glob.sync('schema/resolvers/**/*.js').forEach( function (file) {
    var Resolver = require( path.resolve (file))
    ResolverMap = merge(ResolverMap, Resolver)
  })

  const RootQuery = `
    type RootQuery {
      ${RootQueryMap}
    }

    type Mutation {
      ${MutationMap}
    }
  `;

  // Schema Definition
  const SchemaDefiniton = `
    schema {
      query: RootQuery
      mutation: Mutation
    }
  `;

  TypeMap.push(SchemaDefiniton, RootQuery)

  return {
    typeDefs: TypeMap,
    resolvers: ResolverMap
  }  
}