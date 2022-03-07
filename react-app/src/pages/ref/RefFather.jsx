import React from 'react'
import {Component} from "react";
import RefSon from "./RefSon";

export default class RefFather extends Component {
  son = null
  constructor(props) {
    super(props);

    // 通过 React 创建 ref
    this.son = React.createRef()
  }

  clearSonInput = () => {
    // 这里必须通过 this.son.current 拿到子组件的实例
    console.log(this.son)
    const {current} = this.son
    current.clearInput()
  }

  render() {
    return (
      <div>
        <RefSon ref={this.son}/>
        <button onClick={this.clearSonInput}>clear son's input</button>
      </div>
    )
  }
}