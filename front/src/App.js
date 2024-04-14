import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from './components/KeyPadComponent';

class App extends Component {
  state = {
    result: "",
    tokens: null
  }

  onClick = button => {
    if(button === "=") {
      this.calculate();
    }

    else if(button === "C") {
      this.reset();
    }

    else if(button === "CE") {
      this.backspace();
    }

    else {
      this.setState({
        result: this.state.result + button
      })
    }
  };

  calculate = () => {
    const operation = {
      "expression":this.state.result,
    }
    console.log(operation)
    const raw = JSON.stringify(operation);
    fetch("http://127.0.0.1:5000/calculate", {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: raw,
      redirect: "follow"
    })
      .then(response => response.text())
      .then(data => {
        this.setState({
          result: data.result.result,
          tokens: data.result.tokens
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  reset = () => {
    this.setState({
      result: "",
      tokens: null
    })
  };

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1)
    })
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <h1>Simple Calculator</h1>
          <ResultComponent result={this.state.result} tokens={this.state.tokens} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    )
  }
}

export default App;
