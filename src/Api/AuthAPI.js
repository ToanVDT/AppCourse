// @ts-ignore
import axios from "axios";
import { apiURL } from "../config/config";
import axiosInstance from "../context/helpers/axiosInstance.js";

const Register = async (
  id,
  loginName,
  name,
  password,
  telNum,
  email,
  isActive
) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/Auth/register`,
      id,
      loginName,
      name,
      password,
      telNum,
      email,
      isActive
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Login = async (loginUser, password) => {
  try {  
    const res = await axiosInstance.post(`${apiURL}/api/Auth/login`,{ loginUser, password });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const checkValidToken = async (LoginName) => {
  var headers = { 'content-type': 'application/json'}
  try {
    const res = await axiosInstance.post(`${apiURL}/api/Auth/check-valid-token`, JSON.stringify(LoginName),{'headers':headers, withCredentials: true});
    return res.data
  } catch (error) {
    console.log(error);
  }
};

export { Register, Login, checkValidToken };
