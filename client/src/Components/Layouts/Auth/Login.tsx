import React from "react";
import { toast } from "react-toastify";
import { Button, Input } from "../../UI";

const Login = () => {
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    toast("form submitted");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h2 className="text-app-blue-300 font-bold text-4xl mb-12">Welcome</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" className="mb-3" />
        <Input type="password" label="Password" />
        <div className="flex justify-center pt-8">
          <Button className="!w-28">LOGIN</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
