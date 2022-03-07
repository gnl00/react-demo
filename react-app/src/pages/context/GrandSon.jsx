import {Component} from "react";
import {Consumer} from "../../utils/context";

export default class GrandSon extends Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <div className='GrandSon'>
        <div className='header'>
          <h3>grandson</h3>
        </div>

        <div className='context'>
          <Consumer>
            {(value) =>
              <div>
                <p>grandson: {value}</p>
              </div>
            }
          </Consumer>
        </div>
      </div>
    )
  }
}