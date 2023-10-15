import { BasicLayout } from "./Components/Layouts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sighup from "./Components/Screens/Auth/Sighup";
import { Dashboard, FrontDesc, Guests, Login, NoRouteMatch, Rooms } from "./Components/Screens";
import { DASHBOARD, FRONT_DESK, GUESTS, ROOMS, SETTINGS } from "./Utils/constants";
import Settings from "./Components/Screens/Settings/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sighup" element={<Sighup />} />

          <Route element={<BasicLayout />}>
            <Route index path={`/${DASHBOARD}`}  element={<Dashboard />} />
            <Route index path={`/${FRONT_DESK}`} element={<FrontDesc />} />
            <Route index path={`/${GUESTS}`} element={<Guests />} />
            <Route index path={`/${ROOMS}`} element={<Rooms />} />
            <Route index path={`/${SETTINGS}`} element={<Settings />} />
          </Route>
          <Route path="*" element={<NoRouteMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
