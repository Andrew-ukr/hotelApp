import { toast } from "react-toastify";
import { Button, Input, Textarea } from "./Components/UI";

function App() {
  return (
    <div className="App">
      <Button onClick={() => toast("hello")}>hello</Button>
      <Input label="hello" value="hello" />
      <Textarea label="hello againe"placeholder='hello my dear'  isResize={false} />
    </div>
  );
}

export default App;
