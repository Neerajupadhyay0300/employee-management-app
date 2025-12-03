"use strict";
// src/graphql/schema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
// Employee type
const EmployeeType = new graphql_1.GraphQLObjectType({
    name: "Employee",
    fields: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        department: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        phone: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        hireDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        status: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        attendance: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        role: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
});
// EmployeePage type for pagination results
const EmployeePageType = new graphql_1.GraphQLObjectType({
    name: "EmployeePage",
    fields: {
        employees: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(EmployeeType))) },
        total: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
    },
});
// EmployeeInput for addEmployee mutation
const EmployeeInputType = new graphql_1.GraphQLInputObjectType({
    name: "EmployeeInput",
    fields: {
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        department: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        phone: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        hireDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        status: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        attendance: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        role: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
});
// EmployeeUpdateInput for updateEmployee mutation (all optional fields)
const EmployeeUpdateInputType = new graphql_1.GraphQLInputObjectType({
    name: "EmployeeUpdateInput",
    fields: {
        name: { type: graphql_1.GraphQLString },
        department: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        hireDate: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        attendance: { type: graphql_1.GraphQLFloat },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        role: { type: graphql_1.GraphQLString },
    },
});
// Root Query
const QueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        employees: {
            type: new graphql_1.GraphQLNonNull(EmployeePageType),
            args: {
                page: { type: graphql_1.GraphQLInt },
                pageSize: { type: graphql_1.GraphQLInt },
            },
            resolve: (root, args) => {
                return root.employees(args);
            },
        },
        employee: {
            type: EmployeeType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            resolve: (root, args) => {
                return root.employee(args);
            },
        },
    },
});
// Root Mutation
const MutationType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addEmployee: {
            type: new graphql_1.GraphQLNonNull(EmployeeType),
            args: {
                data: { type: new graphql_1.GraphQLNonNull(EmployeeInputType) },
            },
            resolve: (root, args) => {
                return root.addEmployee(args);
            },
        },
        updateEmployee: {
            type: new graphql_1.GraphQLNonNull(EmployeeType),
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                data: { type: new graphql_1.GraphQLNonNull(EmployeeUpdateInputType) },
            },
            resolve: (root, args) => {
                return root.updateEmployee(args);
            },
        },
        login: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString), // returns JWT token string
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: (root, args) => {
                return root.login(args);
            },
        },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});
//# sourceMappingURL=schema.js.map