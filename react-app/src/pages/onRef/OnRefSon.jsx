import {Component} from "react";

export default class OnRefSon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: 'OnRef_Son'
    }
  }

  componentDidMount() {
    this.props.onRef(this)
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