import { Button } from "../../UI";
import { Link } from "react-router-dom";
import { DASHBOARD } from "../../../Utils/constants";

const NoRouteMatch = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-9xl text-app-blue-700 mb-2">404</h2>
      <p className="text-2xl text-app-grey-900 font-medium mb-6 ">
        Oops! Why you’re here?
      </p>
      <p className="w-96 mb-4 text-center">
        We are very sorry for inconvenience. It looks like you’re try to access
        a page that either has been deleted or never existed.
      </p>
      <Button>
        <Link to={`/${DASHBOARD}`} replace>
          Back
        </Link>
      </Button>
    </div>
  );
};

export default NoRouteMatch;
