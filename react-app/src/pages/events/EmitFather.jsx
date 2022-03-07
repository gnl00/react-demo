import {Component} from "react";
import emitter from '../../utils/event'
import EmitSon1 from "./EmitSon1";
import EmitSon2 from "./EmitSon2";

export default class EmitFather extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    emitter.emit('info', 'arguments or params from father')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击发布事件</button>
        <EmitSon1 />
        <EmitSon2 />
      </div>
    )
  }

}