import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import Posts from './components/posts';

class App extends Component {

  render() {
    return (
      <div className="container">
      <Menu />
      <Posts />
      </div>
    );
  }
}

export default App;
