"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const employee_service_1 = require("../modules/employee/employee.service");
exports.resolvers = {
    employees: ({ page = 1, pageSize = 10 }) => (0, employee_service_1.listEmployees)(page, pageSize),
    employee: ({ id }) => (0, employee_service_1.getEmployeeById)(Number(id)),
    addEmployee: ({ data }) => (0, employee_service_1.addEmployee)(data),
    updateEmployee: ({ id, data }) => (0, employee_service_1.updateEmployee)(Number(id), data),
    login: ({ email, password }) => (0, employee_service_1.loginEmployee)(email, password),
};
//# sourceMappingURL=resolvers.js.map