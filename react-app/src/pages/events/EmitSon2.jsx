import {Component} from "react";

// 通过 emitter.addListener(事件名称,函数名)，进行事件监听/订阅
// 通过 emitter.removeListener(事件名称,函数名) ，进行事件销毁/取消订阅
import emitter from '../../utils/event'

export default class EmitSon2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: 'EmitSon2'
    }
  }

  componentDidMount() {
    // 组件加载完成后开始监听
    emitter.addListener('info', info => {
      this.setState({
        info: 'Son222 接收到消息 -- ' + info
      })
    })
  }

  componentWillUnmount() {
    // 组件销毁前移除监听
    emitter.removeListener('info', info => {
      this.setState({
        info: 'Son222 移除监听 -- ' + info
      })
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.info}</p>
      </div>
    )
  }

}