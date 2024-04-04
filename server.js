import { Server } from "server";
import { makeExecutableSchema } from "tool";
import { GraphQLHTTP } from "http";
import { gql } from "gql";

import { addStudent, delStudent, updateStudent, getStudent } from "./kv.js";

const typeDefs = gql`
  type Query {
    getStudent(class_name: String! rollNo: Int!): Student
  }
  type Mutation {
    addStudent(student: StudentInput!): Student
    delStudent(class_name: String! rollNo:Int!): Student
    updateStudent(student: StudentInput! rollNo:Int!): Student
  }

  input StudentInput {
    name: String
    class: String
    roll_no: Int
    age: Int
    gender: String
    address: String
  }

  type Student {
    name: String
    class: String
    roll_no: Int
    age: Int
    gender: String
    address: String
    }
`;

const resolvers = {
  // Define your resolvers here
  Query: {
    getStudent: async (_, args) => {
        return await getStudent(args.class_name, args.rollNo);
    }
  },

  Mutation: {
    addStudent: async(_, args) => {
        await addStudent(args.student);
        return args.student;
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });



const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP({ schema, graphiql: true })(req)
      : new Response("Not Found", { status: 404 });
  },
  port: 8000, // port of your choice
});
server.listenAndServe();