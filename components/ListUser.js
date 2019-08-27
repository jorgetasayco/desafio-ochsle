import React, { Component } from 'react';

import AddUser from './AddUser';

class ListUser extends Component {

  constructor() {
    super();

    this.state = {
      usuarios: []
    }
  }

  componentDidMount() {
    firebase.database().ref('usuarios/').on('value', snapshot => {
      const currentUsers = snapshot.val();
      
      if (currentUsers != null) {
        this.setState({
          usuarios: currentUsers
        });
      }

    });
  }

  render(){
    const listUsers = this.state.usuarios.map((usuario, i) => {
      return (
        <tr key={usuario.id}>
          <td>{usuario.id}</td>
          <td>
            <a href="javascript:void(0)"><img src="assets/images/users/4.jpg" alt="user" width="40" className="img-circle" /> {usuario.nombre}</a>
          </td>
          <td>{usuario.email}</td>
          <td>{usuario.telefono}</td>
          <td><span className="label label-danger">{usuario.rol}</span> </td>
          <td>{usuario.edad}</td>
          <td>
            <button type="button" className="btn btn-sm btn-icon btn-pure btn-outline delete-row-btn" data-toggle="tooltip" data-original-title="Delete"><i className="ti-close" aria-hidden="true"></i></button>
          </td>
        </tr>
      )
    })

    return (
      <div className="table-responsive">
        <table id="demo-foo-addrow" className="table m-t-30 table-hover contact-list" data-page-size="5">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUsers}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <button type="button" className="btn btn-info btn-rounded" data-toggle="modal" data-target="#add-contact">Add New Contact</button>
              </td>
              <td colSpan="7">
                <div className="text-right">
                  <ul className="pagination"> </ul>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <AddUser/>
      </div>
    )
  }
}

export default ListUser;