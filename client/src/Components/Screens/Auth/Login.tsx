import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "../../UI";
import { Link } from "react-router-dom";
import { handleInputChangeType } from "../../../Types/common";
import { useLoginMutation } from "../../../Redux/Api/authApi";
import { DASHBOARD } from "../../../Utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/Slices/authSlice";

const Login = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    try {
      const response = await login({
        name,
        email,
        password,
      }).unwrap();

      if (response.success) {
        toast(`Welcome!!! ${response.user.name}`);
        dispatch(setUser(response.user));
        navigate(`/${DASHBOARD}`);
      } else {
        toast("Something went wrong");
      }
    } catch (error) {
      console.log({ catch: error });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen ">
      <div className="flex flex-col justify-center items-center w-96 rounded border pt-10">
        <h2 className="text-app-blue-300 font-bold text-4xl mb-12">Welcome</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Use name"
            className="mb-3"
            onChange={handleUserNameChange}
            value={name}
          />
          <Input
            label="Email"
            className="mb-3"
            onChange={handleEmailChange}
            value={email}
          />
          <Input
            type="password"
            label="Password"
            onChange={handlePasswordChange}
            value={password}
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
