import { toast } from 'react-toastify';
import { Button, Input } from './Components/UI';

function App() {
  return (
    <div className="App">
      <Button onClick={() =>  toast('hello') }  >hello</Button>
      <Input label='hello' value='hello'/>
    </div>
  );
}

export default App;
