import { Component } from "react";
import './Son.css'

export default class Son extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sonVal: 1
    }
  }

  data2Home = evt => {
    console.log(evt.target.value)
    this.props.callback(evt.target.value)
  }

  render() {
    const info = 'This is Home\'s Son'
    return (
      <div className='Son'>
        <div className='Son-header'>
          <h1>{info}</h1>
        </div>

        <div className='Son-content'>
          <div  className='props'>
            <p>get value from home: {this.props.homeVal}</p>

            <input type='text' onChange={this.data2Home} placeholder='transfer data to home'/>
          </div>
        </div>
      </div>
    )
  }

}