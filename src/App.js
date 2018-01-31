import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/loginForm";
import Register from "./components/Register";
import EditProfile from './components/editProfile';
import { Route } from 'react-router-dom';
import Persons from './components/Persons';
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
          {/*{this.props.children}*/}
          <Route exact path="/" component={Login}/>
          <Route exact={true} path="/register" component={Register}/>
          <Route path="/editProfile" component={EditProfile}/>
          <Route path="/dashboard" component={Persons}/>
      </div>
    );
  }
}

export default App;
