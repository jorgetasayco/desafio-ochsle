import React, { Component } from 'react';
import shortid from 'shortid';

class AddUser extends Component {

  constructor() {
    super();
    // 
    this.submitUsuario = this.submitUsuario.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      nombre: '',
      email: '',
      telefono: '',
      rol: '',
      edad: '',
      id: shortid.generate(),
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

  onChange (e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  submitUsuario (e) {
    e.preventDefault();
    const usuario = {
      id: this.state.usuarios.length,
      nombre: this.state.nombre,
      email: this.state.email,
      telefono: this.state.telefono,
      rol: this.state.rol,
      edad: this.state.edad
    };

    // Capturamos el ultimo registro
    firebase.database().ref('usuarios/' + usuario.id).set(usuario);
  }

  render(){
    const { nombre, email, telefono, rol, edad } = this.state;
    return (
      <div id="add-contact" className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 className="modal-title" id="myModalLabel">Add New Contact</h4>
            </div>
            <div className="modal-body">
              <form className="form-horizontal form-material">
                <div className="form-group">
                <div className="col-md-12 m-b-20">
                    <input type="text" className="form-control" name="nombre" value={nombre} onChange={this.onChange} placeholder="nombre" />
                  </div>
                  <div className="col-md-12 m-b-20">
                    <input type="text" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
                  </div>
                  <div className="col-md-12 m-b-20">
                    <input type="text" className="form-control" name="telefono" value={telefono} onChange={this.onChange} placeholder="telefono" />
                  </div>
                  <div className="col-md-12 m-b-20">
                    <input type="text" className="form-control" name="rol" value={rol} onChange={this.onChange} placeholder="rol" />
                  </div>
                  <div className="col-md-12 m-b-20">
                    <input type="text" className="form-control" name="edad" value={edad} onChange={this.onChange} placeholder="edad" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.submitUsuario} className="btn btn-info waves-effect">Save</button>
              <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddUser;