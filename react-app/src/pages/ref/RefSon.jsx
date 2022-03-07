import {Component} from "react";

export default class RefSon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: 'Ref_Son'
    }
  }

  handleChange = (evt) => {
    this.setState({
      info: evt.target.value
    })
  }

  clearInput = () => {
    this.setState({
      info: ''
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.info}</p>
        <input type='text' onChange={this.handleChange} />
      </div>
    )
  }
}