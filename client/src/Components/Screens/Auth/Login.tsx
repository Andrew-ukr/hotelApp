import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "../../UI";
import { Link } from "react-router-dom";
import { handleInputChangeType } from "../../../Types/common";
import { useLoginMutation } from "../../../Redux/Slices/auth/authApi";
import {
  DASHBOARD,
  TOAST_SOMETHING_WENT_WRONG,
} from "../../../Utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/Slices/auth/authSlice";
import isEmail from "validator/lib/isEmail";

const Login = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserNameChange: handleInputChangeType = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange: handleInputChangeType = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange: handleInputChangeType = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const isEmailValid = isEmail(email);
    const isNameValid = Boolean(name.trim());
    const isPasswordValid = password.length >= 6;

    setIsEmailInvalid(!isEmailValid);
    setIsNameInvalid(!isNameValid);
    setIsPasswordInvalid(!isPasswordValid);

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      toast.error("Invalid user credentials");
      return;
    }

    try {
      const response = await login({
        name,
        email,
        password,
      }).unwrap();

      if (response.success) {
        toast.success(
          `Welcome!!! ${response.user.name || response.user.email}`
        );
        dispatch(setUser(response.user));
        navigate(`/${DASHBOARD}`);
      } else {
        toast.error(response?.message || TOAST_SOMETHING_WENT_WRONG);
      }
    } catch (error: any) {
      setPassword("");
      toast.error(error?.data?.message || TOAST_SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    setIsEmailInvalid(false);
    setIsNameInvalid(false);
    setIsPasswordInvalid(false);
  }, [email, name, password]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen ">
      <div className="flex flex-col justify-center items-center w-96 rounded border pt-10 px-2">
        <h2 className="text-app-blue-300 font-bold text-4xl mb-2">Welcome</h2>
        <h4 className="text-app-grey-300 text-sm mb-12 text-center">
          Access the App panel using your name, email and password.
        </h4>

        <form onSubmit={handleSubmit}>
          <Input
            label="User name"
            className="mb-3"
            onChange={handleUserNameChange}
            value={name}
            isInvalidValue={isNameInvalid}
          />
          <Input
            label="Email"
            className="mb-3"
            onChange={handleEmailChange}
            value={email}
            isInvalidValue={isEmailInvalid}
          />
          <Input
            type="password"
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            isInvalidValue={isPasswordInvalid}
          />
          <div className="flex justify-center pt-8">
            <Button className="!w-28">LOGIN</Button>
          </div>
        </form>
        <div className="py-10">
          New user?{" "}
          {
            <Link to="/sighup" className="text-app-blue-600 hover:underline">
              Create an account.
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
