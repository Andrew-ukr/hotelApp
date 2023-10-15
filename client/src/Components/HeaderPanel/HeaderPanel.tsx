import React from "react";
import { Button, Search } from "../UI";
import { useLazyLogoutQuery } from "../../Redux/Api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slices/authSlice";
import { toast } from "react-toastify";

const HeaderPanel = () => {
  const [logout, { isLoading }] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setUser(null));
      toast("User Logged out");
    }
  };

  return (
    <div className="flex justify-between py-7">
      <Search />
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default HeaderPanel;
