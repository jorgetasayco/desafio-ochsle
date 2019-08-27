import React, { Component } from 'react';
import { render } from 'react-dom';

import ListUser from './components/ListUser';

class App extends Component {
  render() {
   return (
    <div className="card-body">
      <h4 className="card-title">Lista de Usuarios</h4>
      <h6 className="card-subtitle"></h6>
      <ListUser/>
    </div>
   ) 
  }
}

render(
  <App/>,
  document.getElementById('appRad1Us')
);