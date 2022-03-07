import { Component } from "react";
import './Home.css'
import Son from "./child/Son";
import Father from "../context/Father";
import MultiContext from "../multiContext/MultiContext";
import OnRefFather from "../onRef/OnRefFather";
import RefFather from "../ref/RefFather";
import EmitFather from "../events/EmitFather";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: 'This is Home page',
      homeSte: 'default_Home_State',
      homeVal: 100,
      sonVal: null,
      contextVal: 'context Val from home'
    }
  }

  sonCallBack = val => {
    // val 就是从子组件传递过来的数据
    this.setState({
      sonVal: val
    }, () => {
      // 数据同步
      console.log(this.state.sonVal)
    })

    // 数据不同步
    console.log(this.state.sonVal)

  }

  render() {
    return (
      <div className='Home'>
        <header className='Home-header'>
          <h1>{this.state.info}</h1>
          <p>homeSte: {this.state.homeSte}</p>
        </header>

        <div className='Home-nav'>

        </div>

        <div className='Home-content'>
          <p>get value from son: {this.state.sonVal}</p>

          <Son homeVal={this.state.homeVal} callback={this.sonCallBack} />
        </div>

        <div className='Home-father' style={{border: 'red solid 2px'}}>
          <Father />
        </div>

        <div className='MultiContext' style={{border: 'black solid 2px'}}>
          <MultiContext />
        </div>

        <div className='onRef' style={{border: 'pink solid 2px'}}>
          <OnRefFather />
        </div>

        <div className='Ref' style={{border: 'green solid 2px'}}>
          <RefFather />
        </div>

        <div className='Events'>
          <EmitFather />
        </div>
      </div>
    )
  }

}