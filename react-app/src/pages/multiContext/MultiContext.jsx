import React, {Component} from "react";
import MultiSon from "./MultiSon";

export const Context1 = React.createContext(null)
export const Context2 = React.createContext(null)

export default class MultiContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cVal1: '111111',
      cVal2: '222222'
    }
  }

  render() {
    return (
      <div>
        <Context1.Provider value={this.state.cVal1}>
          <Context2.Provider value={this.state.cVal2}>
            <MultiSon />
          </Context2.Provider>
        </Context1.Provider>
      </div>
    )
  }

}