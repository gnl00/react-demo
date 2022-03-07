import {Component} from "react";
import OnRefSon from "./OnRefSon";

export default class OnRefFather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: ''
    }
  }
  child = null

  // 拿到子组件实例
  sonOnRef = (ref) => {
    this.child = ref
  }

  clearSonInput = () => {
    this.child.clearInput()
  }

  render() {
    return (
      <div>
        <OnRefSon onRef={this.sonOnRef} />
        <button onClick={this.clearSonInput}>clear Son input</button>
      </div>
    )
  }
}