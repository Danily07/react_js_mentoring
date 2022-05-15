import logo from './logo.svg';
import React, { useState } from 'react';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {count: 0}
    }

    increaseCount= () => {
        this.setState({
            count: this.state.count + 1
        });
    }

    decreaseCount= () =>
    {
        this.setState({
            count: this.state.count - 1
        });
    }

    render() { 
        return (
           <div className="App">
            <div className="Counter">
              <h2>Current value: {this.state.count}</h2>
            </div>
            <button onClick={this.increaseCount}>Increase</button>
            <button onClick={this.decreaseCount}>Decrease</button>
          </div>
        )
    }
}

export default App;
