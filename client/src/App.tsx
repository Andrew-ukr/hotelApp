import { toast } from "react-toastify";
import { Button, Input, Textarea } from "./Components/UI";
import { Login } from "./Components/Layouts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sighup from "./Components/Layouts/Auth/Sighup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sighup" element={<Sighup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
