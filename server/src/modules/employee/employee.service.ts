import prisma from "../../lib/db";
import { comparePassword, createToken, hashPassword } from "../../lib/auth";
import { EmployeeInput } from "./employee.type";

export const listEmployees = async (page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;
  let employees = await prisma.employee.findMany({
    skip,
    take: pageSize,
    orderBy: { id: "asc" },
  });
  let total = await prisma.employee.count();

  if (total === 0) {
    const seeds: EmployeeInput[] = [
      { name: "Emma Thompson", department: "Marketing", phone: "+1 (555) 345-6789", hireDate: "2021-02-28", status: "active", attendance: 93.7, email: "emma@company.com", password: "password123", role: "employee" },
      { name: "James Wilson", department: "Design", phone: "+1 (555) 456-7890", hireDate: "2019-11-30", status: "remote", attendance: 92.1, email: "james@company.com", password: "password123", role: "employee" },
      { name: "Lisa Wang", department: "Analytics", phone: "+1 (555) 234-5678", hireDate: "2022-01-10", status: "active", attendance: 95.3, email: "lisa@company.com", password: "password123", role: "employee" },
      { name: "Michael Rodriguez", department: "Product", phone: "+1 (555) 987-6543", hireDate: "2021-08-22", status: "active", attendance: 94.2, email: "michael@company.com", password: "password123", role: "employee" },
      { name: "Robert Kim", department: "Engineering", phone: "+1 (555) 876-5432", hireDate: "2020-06-18", status: "on-leave", attendance: 89.8, email: "robert@company.com", password: "password123", role: "employee" },
      { name: "Sarah Chen", department: "Engineering", phone: "+1 (555) 123-4567", hireDate: "2020-03-15", status: "active", attendance: 97.5, email: "sarah@company.com", password: "password123", role: "employee" },
    ];
    for (const s of seeds) {
      const hashed = await hashPassword(s.password);
      await prisma.employee.create({ data: { ...s, password: hashed, hireDate: new Date(s.hireDate) } });
    }
    total = await prisma.employee.count();
    employees = await prisma.employee.findMany({
      skip,
      take: pageSize,
      orderBy: { id: "asc" },
    });
  }

  return { employees, total };
};

export const getEmployeeById = (id: number) =>
  prisma.employee.findUnique({ where: { id } });

export const addEmployee = async (data: EmployeeInput) => {
  const hashed = await hashPassword(data.password);
  return prisma.employee.create({
    data: { ...data, password: hashed },
  });
};

export const updateEmployee = async (id: number, data: Partial<EmployeeInput>) => {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  return prisma.employee.update({
    where: { id },
    data,
  });
};

export const loginEmployee = async (email: string, password: string) => {
  const user = await prisma.employee.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const match = await comparePassword(password, user.password);
  if (!match) {
    throw new Error("Invalid password");
  }
  return createToken({ id: user.id, role: user.role });
};
