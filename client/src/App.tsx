import { BasicLayout } from "./Components/Layouts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sighup from "./Components/Screens/Auth/Sighup";
import {
  Dashboard,
  FrontDesc,
  Guests,
  Login,
  NoRouteMatch,
  Rooms,
} from "./Components/Screens";
import {
  DASHBOARD,
  FRONT_DESK,
  GUESTS,
  LOGIN,
  ROOMS,
  SETTINGS,
  SIGHUP,
} from "./Utils/constants";
import Settings from "./Components/Screens/Settings/Settings";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import { Select } from "./Components/UI";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${DASHBOARD}`} />} />
          <Route path={`/${LOGIN}`} element={<Login />} />
          <Route path={`/${SIGHUP}`} element={<Sighup />} />
          <Route
            path={`/test`}
            element={
              <div className="h-screen">
                <Select
                  onChange={() => {}}
                  options={[
                    { id: 1, name: "Wade Cooper" },
                    { id: 2, name: "Arlene Mccoy" },
                    { id: 3, name: "Devon Webb" },
                    { id: 4, name: "Tom Cook" },
                    { id: 5, name: "Tanya Fox" },
                  ]}
                  value={{ id: 1, name: "Wade Cooper" }}
                />
              </div>
            }
          />

          <Route element={<ProtectedRoutes />}>
            <Route element={<BasicLayout />}>
              <Route index path={`/${DASHBOARD}`} element={<Dashboard />} />
              <Route index path={`/${FRONT_DESK}`} element={<FrontDesc />} />
              <Route index path={`/${GUESTS}`} element={<Guests />} />
              <Route index path={`/${ROOMS}`} element={<Rooms />} />
              <Route index path={`/${SETTINGS}`} element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<NoRouteMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
