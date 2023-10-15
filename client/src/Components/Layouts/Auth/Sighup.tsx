import React from "react";
import { toast } from "react-toastify";
import { Button, Input } from "../../UI";
import { Link } from "react-router-dom";

const Sighup = () => {
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    toast("form submitted");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h2 className="text-app-blue-300 font-bold text-4xl mb-12">Welcome</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" className="mb-3" />
        <Input type="password" label="Password" className="mb-3" />
        <Input type="password" label="Repeat password" />
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
  );
};

export default Sighup;
