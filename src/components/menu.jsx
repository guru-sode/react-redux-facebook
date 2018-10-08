import React, { Component } from 'react';
import { connect } from 'react-redux';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
      }

  handleChange(event){
    this.props.SELECTOR(event.target.value);
  }
  render() {
    return (
      <select id="selector" onChange={this.handleChange}>
        <option value="select">Select type</option>
        <option value="text">Text only</option>
        <option value="image">Images only</option>
        <option value="textImage">Text and Image</option>
        <option value="none">No items</option>
      </select>
    );
  }
}

const mapStateToProps = state => {
    return {
      data: state.data,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      SELECTOR: event=>dispatch({ type: 'SELECTOR', payload:event }),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu);
