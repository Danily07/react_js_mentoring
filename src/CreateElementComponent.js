import logo from './logo.svg';
import React, { useState } from 'react';

function App() {
    const [count, changeCount] = useState(0);
    return React.createElement("div", {
      className: "App"
    }, React.createElement("div", {
      className: "Counter"
    }, React.createElement("h2", null, "Current value: ", count)), React.createElement("button", {
      onClick: () => changeCount(count + 1)
    }, "Increase"), React.createElement("button", {
      onClick: () => changeCount(count - 1)
    }, "Decrease"));
}

export default App;
