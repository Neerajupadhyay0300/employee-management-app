import {
  addEmployee,
  getEmployeeById,
  listEmployees,
  updateEmployee,
  loginEmployee,
} from "../modules/employee/employee.service";
import { EmployeeInput } from "../modules/employee/employee.type";

export const resolvers = {
  employees: ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) =>
    listEmployees(page, pageSize),

  employee: ({ id }: { id: string }) => getEmployeeById(Number(id)),

  addEmployee: ({ data }: { data: EmployeeInput }) => addEmployee(data),

  updateEmployee: ({ id, data }: { id: string; data: Partial<EmployeeInput> }) =>
    updateEmployee(Number(id), data),

  login: ({ email, password }: { email: string; password: string }) =>
    loginEmployee(email, password),
};
