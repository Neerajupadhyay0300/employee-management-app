// src/graphql/schema.ts

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from "graphql";

// Employee type
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    hireDate: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    attendance: { type: new GraphQLNonNull(GraphQLFloat) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
});

// EmployeePage type for pagination results
const EmployeePageType = new GraphQLObjectType({
  name: "EmployeePage",
  fields: {
    employees: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(EmployeeType))) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

// EmployeeInput for addEmployee mutation
const EmployeeInputType = new GraphQLInputObjectType({
  name: "EmployeeInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    department: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    hireDate: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    attendance: { type: new GraphQLNonNull(GraphQLFloat) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
});

// EmployeeUpdateInput for updateEmployee mutation (all optional fields)
const EmployeeUpdateInputType = new GraphQLInputObjectType({
  name: "EmployeeUpdateInput",
  fields: {
    name: { type: GraphQLString },
    department: { type: GraphQLString },
    phone: { type: GraphQLString },
    hireDate: { type: GraphQLString },
    status: { type: GraphQLString },
    attendance: { type: GraphQLFloat },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  },
});

// Root Query
const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    employees: {
      type: new GraphQLNonNull(EmployeePageType),
      args: {
        page: { type: GraphQLInt },
        pageSize: { type: GraphQLInt },
      },
      resolve: (root: any, args: any) => {
        return root.employees(args);
      },
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (root: any, args: any) => {
        return root.employee(args);
      },
    },
  },
});

// Root Mutation
const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: new GraphQLNonNull(EmployeeType),
      args: {
        data: { type: new GraphQLNonNull(EmployeeInputType) },
      },
      resolve: (root: any, args: any) => {
        return root.addEmployee(args);
      },
    },
    updateEmployee: {
      type: new GraphQLNonNull(EmployeeType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(EmployeeUpdateInputType) },
      },
      resolve: (root: any, args: any) => {
        return root.updateEmployee(args);
      },
    },
    login: {
      type: new GraphQLNonNull(GraphQLString), // returns JWT token string
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (root: any, args: any) => {
        return root.login(args);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
