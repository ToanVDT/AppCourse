import axios from "axios";
import { apiURL } from "../config/config";

const checkExistedSendConfirmMail = async (
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
      `${apiURL}/api/User/check-existed-and-send-confirm-mail`,
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

const RegisterUser = async (
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
      `${apiURL}/api/User/register-user`,
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

const SendForgetCode = async (email) => {
  try {
    const res = await axios.gett(
      `${apiURL}/api/User/send-forget-code?email=${email}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (loginUser, password) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/User/change-password`,
      loginUser,
      password
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const GetAllCourse = async (userId) => {
  try {
    const res = await axios.get(
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
    const res = await axios.post(
      `${apiURL}/api/User/enroll-course`,
      userId,
      courseId,
      registerStatus,
      createdDate,
      updatedDate,
      isActive
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const WithdrawCourse = async (userId, courseId) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/User/withdraw-course`,
      userId,
      courseId
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const GetJoiningCourse = async (userId) => {
  try {
    const res = await axios.get(
      `${apiURL}/api/User/get-joining-course?userId=${userId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const GetInfoUser = async (userId) => {
  try {
    const res = await axios.get(
      `${apiURL}/api/User/get-info-user?userId=${userId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const CheckExistAndSendConfirmChangeMail = async (email) => {
  try {
    const res = await axios.get(
      `${apiURL}/api/User/check-existed-and-send-confirm-change-email?email=${email}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateProfile = async (id, loginName, name, email, telNum) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/User/update-profile`,
      id,
      loginName,
      name,
      email,
      telNum
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
