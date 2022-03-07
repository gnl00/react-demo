import {Component} from "react";
import {Consumer} from "../../utils/context";
import GrandSon from "./GrandSon";

export default class Son extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='ContextSon'>
        <div className='header'>
          <h2>context son</h2>
        </div>

        <div className='context'>
          <Consumer>
            {/* 注意： 接收 context传递的值时，最外层只有一个大括号 */}
            {(value) =>
              <div>
                <p>son: {value}</p>
                <GrandSon />
              </div>
            }
          </Consumer>
        </div>
      </div>
    )
  }
}