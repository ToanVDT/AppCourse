// @ts-ignore
import axios from "axios";
import { apiURL } from "../config/config";
import axiosInstance from "../context/helpers/axiosInstance.js";

const checkExistedSendConfirmMail = async (
 
  loginName,
  name,
  password,
  telNum,
  email,

) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/User/check-existed-and-send-confirm-mail`,
      {
      loginName,
      name,
      password,
      telNum,
      email,
   }
    );
    console.log("API call",res.data)
    return res.data;
    
  } catch (error) {
    console.log(error);
  }
};
const RegisterUser = async (

  loginName,
  name,
  password,
  telNum,
  email,

) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/User/register-user`,
     {
      loginName,
      name,
      password,
      telNum,
      email,
    }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const SendForgetCode = async (email) => {
  try {
    const res = await axios.get(
      `${apiURL}/api/User/send-forget-code?email=${email}`
    );

    console.log("API call ",res.data)
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const changePassword = async (loginUser, password) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/User/change-password`,
     { loginUser,
      password}
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const GetAllCourse = async (userId) => {
  try {
    const res = await axiosInstance.get(
      `${apiURL}/api/User/get-all-course-for-home-page?userId=${userId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const EnrollCourse = async (
  userId,
  courseId,
  registerStatus,
  createdDate,
  updatedDate,
  isActive
) => {
  try {
    const res = await axiosInstance.post(
      `${apiURL}/api/User/enroll-course`,
      {userId,
      courseId,
      registerStatus,
      createdDate,
      updatedDate,
      isActive}
    );
    console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

const WithdrawCourse = async (userId, courseId) => {
  try {
    const res = await axiosInstance.post(
      `${apiURL}/api/User/withdraw-course`,
     { userId,
      courseId}
    );
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

const GetJoiningCourse = async (userId) => {
  try {
    const res = await axiosInstance.get(
      `${apiURL}/api/User/get-joining-course?userId=${userId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const GetInfoUser = async (userId) => {
  // var headers = { 'content-type': 'application/json'}
  try {
    const res = await axiosInstance.get(`${apiURL}/api/User/get-info-user?userId=${userId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const CheckExistAndSendConfirmChangeMail = async (email) => {
  try {
    const res = await axiosInstance.get(
      `${apiURL}/api/User/check-existed-and-send-confirm-change-email?email=${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateProfile = async (id, loginName, name, email, telNum) => {
  try {
    const res = await axiosInstance.post(
      `${apiURL}/api/User/update-profile`,
      {id,
      loginName,
      name,
      email,
      telNum}
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  checkExistedSendConfirmMail,
  RegisterUser,
  SendForgetCode,
  changePassword,
  GetAllCourse,
  EnrollCourse,
  WithdrawCourse,
  GetJoiningCourse,
  GetInfoUser,
  CheckExistAndSendConfirmChangeMail,
  UpdateProfile,
};
