import { Search } from "../UI";
import UserDropdown from "../UserDropdown/UserDropdown";

const HeaderPanel = () => {
  return (
    <div className="flex justify-between py-7">
      <Search />
      <UserDropdown />
    </div>
  );
};

export default HeaderPanel;
