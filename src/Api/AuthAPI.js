import axios from "axios";
import { apiURL } from "../config/config";

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
  
    const res = await axios.post(
      `${apiURL}/api/Auth/login`,
      {loginUser,
      password}
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const checkValidToken = async (stringInput) => {
  try {
    const res = await axios.post(
      `${apiURL}/api/Auth/check-valid-token`,
      stringInput
    );
    return res.data
  } catch (error) {
    console.log(error);
  }
};

export { Register, Login, checkValidToken };
