import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Alert } from "reactstrap";

class App extends Component {
  constructor() {
    super();

    this.state = { operand1: null, operand2: null, operator: null, result: 0 };
    this.onClearPress = this.onClearPress.bind(this);
    this.onNumPress = this.onNumPress.bind(this);
    this.onOperatorPress = this.onOperatorPress.bind(this);
  }
  onNumPress(e, num) {
    if (this.state.operator == null) {
      if (this.state.operand1 == null) {
        this.setState({ operand1: num, result: num })
      }
      else {
        let temp = this.state.operand1 * 10 + num;
        this.setState({ operand1: temp, result: temp })
      }
    } else {
      if (this.state.operand2 == null) {
        this.setState({ operand2: num, result: num })
      }
      else {
        let temp = this.state.operand2 * 10 + num;
        this.setState({ operand2: temp, result: temp })
      }
    }

  }
  PerformOperation() {
    let result = 0;
    switch (this.state.operator) {
      case '+':
        result = Number.parseInt(this.state.operand1) + Number.parseInt(this.state.operand2);
        break;
      case '-':
        result = Number.parseInt(this.state.operand1) - Number.parseInt(this.state.operand2);
        break;
      case 'x':
        result = Number.parseInt(this.state.operand1) * Number.parseInt(this.state.operand2);
        break;

      default:
        result = this.state.operand2;
        break;
    }
    return result;
  }
  onOperatorPress(e, op) {
    if (this.state.operand2 != null) {
      let res = this.PerformOperation();
      console.log(res);
      this.setState({ operand1: res, result: res, operand2: null });
    }
    this.setState({ operator: op });
  }

  

  onClearPress() {
    this.setState({ operand1: null, operand2: null, operator: null, result: 0 });
  }


  render() {

    let numbers = [7,8,9,4,5,6,1,2,3,0];
    let operators = ['+', '-', 'x', '='];

    const operandButtons = numbers.map(num => {
      return <Button outline color="info" className="numButton col-4" key={num} onClick={(e) => this.onNumPress(e, num)} >{num}</Button>;
    });

    const operatorButtons = operators.map(op => {
      return <Button outline color="warning" className="operatorButton col" key={op} onClick={(e) => this.onOperatorPress(e, op)}>{op}</Button>;
    });

    return (
      <div className="App container" >
        <Alert color="info row" style={{ margin: 0, padding: 0, minWidth: "100%", height: 70 }}>
          <span className="resultText">{this.state.result}</span>
        </Alert>
        <div className="row" style={{ margin: 0, padding: 0, minWidth: "100%" }}>
          <div className="Numbers col-9">
            <div className="row">
              {operandButtons}
              <Button outline color="danger" className="clearButton col-sm-8" onClick={() => this.onClearPress()}>AC</Button>
            </div>
          </div>
          <div className="Operators col-3">
            <div className="row">
            {operatorButtons}
          </div>
          </div>
        </div>

      </div>

    );
  }
}

export default App;
