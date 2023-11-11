import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { LOGIN } from "../../Utils/constants";
import { selectAuth, setUser } from "../../Redux/Slices/auth/authSlice";
import { useLazyCurrentUserQuery } from "../../Redux/Slices/user/userApi";
import { useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";

const ProtectedRoutes = () => {
  const { user } = useSelector(selectAuth);
  const [currentUser, { isLoading }] = useLazyCurrentUserQuery();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await currentUser().unwrap();
      if (response.success) {
        dispatch(setUser(response.user));
      }
    } catch (error) {
      navigate(`/${LOGIN}`);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, []);

  if (isLoading || !user)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <SyncLoader color="#1570ef" />
      </div>
    );

  return <Outlet />;
};

export default ProtectedRoutes;
