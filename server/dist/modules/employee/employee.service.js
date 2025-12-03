"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEmployee = exports.updateEmployee = exports.addEmployee = exports.getEmployeeById = exports.listEmployees = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const auth_1 = require("../../lib/auth");
const listEmployees = async (page = 1, pageSize = 10) => {
    const skip = (page - 1) * pageSize;
    let employees = await db_1.default.employee.findMany({
        skip,
        take: pageSize,
        orderBy: { id: "asc" },
    });
    let total = await db_1.default.employee.count();
    if (total === 0) {
        const seeds = [
            { name: "Emma Thompson", department: "Marketing", phone: "+1 (555) 345-6789", hireDate: "2021-02-28", status: "active", attendance: 93.7, email: "emma@company.com", password: "password123", role: "employee" },
            { name: "James Wilson", department: "Design", phone: "+1 (555) 456-7890", hireDate: "2019-11-30", status: "remote", attendance: 92.1, email: "james@company.com", password: "password123", role: "employee" },
            { name: "Lisa Wang", department: "Analytics", phone: "+1 (555) 234-5678", hireDate: "2022-01-10", status: "active", attendance: 95.3, email: "lisa@company.com", password: "password123", role: "employee" },
            { name: "Michael Rodriguez", department: "Product", phone: "+1 (555) 987-6543", hireDate: "2021-08-22", status: "active", attendance: 94.2, email: "michael@company.com", password: "password123", role: "employee" },
            { name: "Robert Kim", department: "Engineering", phone: "+1 (555) 876-5432", hireDate: "2020-06-18", status: "on-leave", attendance: 89.8, email: "robert@company.com", password: "password123", role: "employee" },
            { name: "Sarah Chen", department: "Engineering", phone: "+1 (555) 123-4567", hireDate: "2020-03-15", status: "active", attendance: 97.5, email: "sarah@company.com", password: "password123", role: "employee" },
        ];
        for (const s of seeds) {
            const hashed = await (0, auth_1.hashPassword)(s.password);
            await db_1.default.employee.create({ data: { ...s, password: hashed, hireDate: new Date(s.hireDate) } });
        }
        total = await db_1.default.employee.count();
        employees = await db_1.default.employee.findMany({
            skip,
            take: pageSize,
            orderBy: { id: "asc" },
        });
    }
    return { employees, total };
};
exports.listEmployees = listEmployees;
const getEmployeeById = (id) => db_1.default.employee.findUnique({ where: { id } });
exports.getEmployeeById = getEmployeeById;
const addEmployee = async (data) => {
    const hashed = await (0, auth_1.hashPassword)(data.password);
    return db_1.default.employee.create({
        data: { ...data, password: hashed },
    });
};
exports.addEmployee = addEmployee;
const updateEmployee = async (id, data) => {
    if (data.password) {
        data.password = await (0, auth_1.hashPassword)(data.password);
    }
    return db_1.default.employee.update({
        where: { id },
        data,
    });
};
exports.updateEmployee = updateEmployee;
const loginEmployee = async (email, password) => {
    const user = await db_1.default.employee.findUnique({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    const match = await (0, auth_1.comparePassword)(password, user.password);
    if (!match) {
        throw new Error("Invalid password");
    }
    return (0, auth_1.createToken)({ id: user.id, role: user.role });
};
exports.loginEmployee = loginEmployee;
//# sourceMappingURL=employee.service.js.map