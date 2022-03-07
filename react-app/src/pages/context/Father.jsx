import {Component} from "react";
import {Provider} from "../../utils/context";
import ContextSon from "./ContextSon";

export default class Father extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: 'data for context'
    }
  }

  render() {
    return (
      <div className='Father'>
        <div className='Father-header'>
          <h1>This is Father's content</h1>
        </div>
        <Provider value={this.state.info}>
          <div>
            <p>father: {this.state.info}</p>
            <ContextSon />
          </div>
        </Provider>
      </div>
    )
  }
}