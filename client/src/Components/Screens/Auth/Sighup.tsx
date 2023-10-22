import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "../../UI";
import { Link, useNavigate } from "react-router-dom";
import { handleInputChangeType } from "../../../Types/common";
import { useRegisterMutation } from "../../../Redux/Slices/authApi";
import {
  DASHBOARD,
  TOAST_SOMETHING_WENT_WRONG,
} from "../../../Utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/Slices/authSlice";
import isEmail from "validator/lib/isEmail";

const Sighup = () => {
  const [register, { isLoading, isError, status, isSuccess }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    try {
      const response = await register({
        name,
        email,
        password,
      }).unwrap();

      console.log(response);

      if (response.success) {
        toast("New user successfully created");
        dispatch(setUser(response.user));
        navigate(`/${DASHBOARD}`);
      } else {
        toast("New user successfully created");
        dispatch(setUser(response.user));
      }
    } catch (error: any) {
      toast.error(error?.data?.message || TOAST_SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-96 rounded border pt-10 px-2">
        <h2 className="text-app-blue-300 font-bold text-4xl mb-2">Register</h2>
        <h4 className="text-app-grey-300 text-sm mb-12 text-center">
          Create New Account
        </h4>
        <form onSubmit={handleSubmit}>
          <Input
            label="User name"
            className="mb-3"
            value={name}
            onChange={handleUserNameChange}
          />
          <Input
            label="Email"
            className="mb-3"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            label="Password"
            className="mb-3"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="flex justify-center pt-8">
            <Button className="!w-28">SIGHUP</Button>
          </div>
        </form>
        <div className="py-10">
          Already have an account?{" "}
          {
            <Link to="/login" className="text-app-blue-600 hover:underline">
              Log in.
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Sighup;
