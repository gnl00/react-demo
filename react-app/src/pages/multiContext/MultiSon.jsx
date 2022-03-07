import {Component} from "react";
import {Context1, Context2} from "./MultiContext";

export default class MultiSon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Context1.Consumer>
          {val1 =>
            <div>
              <Context2.Consumer>
                {val2 =>
                  <div>
                    <p>{val1}</p>
                    <p>{val2}</p>
                  </div>
                }
              </Context2.Consumer>
            </div>
          }
        </Context1.Consumer>
      </div>
    )
  }

}