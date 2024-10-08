import { EmployeeInterface } from "../../interfaces/Employee";
import { LoginInterface } from "../../interfaces/Login";
import { MemberInterface } from "../../interfaces/Member";
import { OrderInterface } from "../../interfaces/Order";
import axios from "axios";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function SignIn(data: LoginInterface) {
  return await axios
    .post(`${apiUrl}/signIn`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateEmployee(data: EmployeeInterface) {
  return await axios
    .post(`${apiUrl}/employee`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetEmployees() {
  return await axios
    .get(`${apiUrl}/employees`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetEmployeeByID(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/employee/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateEmployee(id: string | undefined, data: EmployeeInterface) {
  return await axios
    .patch(`${apiUrl}/employee/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteEmployeeByID(id: string | undefined) {
  return await axios
    .delete(`${apiUrl}/employee/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateMember(data: MemberInterface) {
  return await axios
    .post(`${apiUrl}/member`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetMembers() {
  return await axios
    .get(`${apiUrl}/members`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetMemberByID(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/member/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateMember(id: string | undefined, data: MemberInterface) {
  return await axios
    .patch(`${apiUrl}/member/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteMemberByID(id: string | undefined) {
  return await axios
    .delete(`${apiUrl}/member/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetGenders() {
  return await axios
    .get(`${apiUrl}/genders`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPositions() {
  return await axios
    .get(`${apiUrl}/positions`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetRanks() {
  return await axios
    .get(`${apiUrl}/ranks`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetStatusOrders() {
  return await axios
    .get(`${apiUrl}/order`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOrders() {
  return await axios
    .get(`${apiUrl}/order`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOrderByID(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/order/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateOrder(id: string | undefined, data: OrderInterface) {
  return await axios
    .patch(
      `${apiUrl}/order/${id}`, 
      data, 
      requestOptions
    )
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOrderProducts() {
  return await axios
    .get(`${apiUrl}/order/detail`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetOrderProductsByOrderID(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/order/detail/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetProductsByID(id: string | undefined) {
  return await axios
    .get(`${apiUrl}/order/detail/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}



export {
  SignIn,
  CreateEmployee,
  GetEmployees,
  GetEmployeeByID,
  UpdateEmployee,
  DeleteEmployeeByID,
  CreateMember,
  GetMembers,
  GetMemberByID,
  UpdateMember,
  DeleteMemberByID,
  GetGenders,
  GetPositions,
  GetRanks,
  GetStatusOrders,
  GetOrders,
  GetOrderByID,
  UpdateOrder,
  GetOrderProducts,
  GetOrderProductsByOrderID,
  GetProductsByID,
};