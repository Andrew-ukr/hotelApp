import { Popover } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { USER_PROFILE } from "../../Utils/constants";
import { Button, Icon } from "../UI";
import { useLazyLogoutQuery } from "../../Redux/Slices/authApi";
import { selectAuth, setUser } from "../../Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserDropdown = () => {
  const [logout, { isLoading }] = useLazyLogoutQuery();
  const { user } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setUser(null));
      toast.success("User Logged out");
    }
  };

  return (
    <Popover className="relative flex flex-row-reverse w-56">
      <Popover.Button className="flex items-center cursor-pointer text-sm text-app-grey-500 outline-none hover:text-app-grey-900">
        {user?.email || ""}
        <span className="ml-2">
          <Icon name="UserList" size={24} />
        </span>
      </Popover.Button>

      <Popover.Panel className="absolute w-full z-10 right-0 top-10 p-2 rounded bg-white border border-app-grey-200 text-app-grey-600">
        <ul className="w-full">
          <li className="inline-block truncate rounded py-1 px-2 hover:bg-app-blue-300 hover:text-white w-full">
            <NavLink to={`/${USER_PROFILE}`}>Profile</NavLink>
          </li>
        </ul>
        <hr className="my-3" />
        <Button onClick={handleLogout} className="!w-full">
          Log out
        </Button>
      </Popover.Panel>
    </Popover>
  );
};

export default UserDropdown;
