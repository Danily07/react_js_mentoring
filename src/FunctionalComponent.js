import logo from './logo.svg';
import { useState } from 'react';

function App() {
  const [count, changeCount] = useState(0);

  return (
    <div className="App">
      <div className="Counter">
        <h2>Current value: {count}</h2>
      </div>
      <button onClick={() => changeCount(count + 1)}>Increase</button>
      <button onClick={() => changeCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App;
