import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';

const url = "https://jsonplaceholder.typicode.com/users";


class Usuarios extends Component {

    state = {
        data: [],
        form: {
            id: '',
            name: '',
            username: '',
            address: {
                street:'',
                suite:'',
                city:'',
                zipcode:''

            }
        }
        
    }

    componentDidMount() {
        this.peticionesGet();
    }

    //Peticiones
    peticionesGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionesPost = async () => {
        delete this.state.form.id;
         await axios.post(url, this.state.form)
         .then(response => { // luego de que inserte
             this.modalInsertar(); //cerramos el modal
             this.peticionesGet(); // llamamos a la petición get para que refresque y actualice la info
         }).catch(error => {
            console.log(error.message);
        })
    }

    peticionesPut = () => {
        axios.put(url+this.state.form.id, this.state.form).then(response=>{
            this.modalInsertar(); //cierre el modal
            this.peticionesGet(); // refresque
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionesDelete=()=>{
        axios.delete(url+this.state.form.id)
        .then(response =>{
            this.setState({modalEliminar:false});
            this.peticionesGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    modalInsertar = () => {
        this.setState({modalInsertar: !this.state.modalInsertar})
    }


          
  handleChange = async (e) => {
     e.persist();
    await this.setState({
        form:{
            ...this.state.form, // heredamos todos los atributos
            [e.target.name]: e.target.value //tal cual el nombre como se guardó en el estado, se debe llamar

            //el input
        }
    })
    //mostremos por consola lo que va capturando
    console.log(this.state.form);
  }
    
  //seleccionar heroe
  seleccionarHeroe=(heroe)=>{
      this.setState({
          tipoModal: 'actualizar',
          form: {
              id: heroe.id,
              name: heroe.name,
              superhero: heroe.superhero,
              publisher: heroe.publisher,
              alter_ego: heroe.alter_ego,
              first_appearance: heroe.first_appearance,
              image: heroe.image,
          }
      })
  }
    
    render() {
        const {form} = this.state;
        return (
            <div className="container">

                <br /> <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>username</th>
                            <th>email</th>
                            <th>street</th>
                            <th>suite</th>
                            <th>city</th>
                            <th>zipcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(users => {
                                return (
                                    <tr>
                                         <td>{users.id}</td>
                                         <td>{users.name}</td>
                                         <td>{users.username}</td>
                                         <td>{users.email}</td>
                                         <td>{users.address.street}</td>
                                         <td>{users.address.suite}</td>
                                         <td>{users.address.city}</td>
                                         <td>{users.address.zipcode}</td>
                                         <button className="btn btn-primary"
                                         onClick={() => {this.seleccionarHeroe(users);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <h1>Modal Insertar</h1>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">id</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                            <br/>
                            <label htmlFor="name">name</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name:''}/>
                            <br/>
                            <label htmlFor="username">username</label>
                            <input className="form-control" type="text" name="username" id="username" onChange={this.handleChange} value={form?form.username:''}/>
                            <br/>
                            <label htmlFor="street">street</label>
                            <input className="form-control" type="text" name="street" id="street" onChange={this.handleChange} value={form?form.address.street:''}/>
                            <br/>
                            <label htmlFor="suite">suite</label>
                            <input className="form-control" type="text" name="suite" id="suite" onChange={this.handleChange} value={form?form.address.suite:''}/>
                            <br/>
                            <label htmlFor="city">city</label>
                            <input className="form-control" type="text" name="city" id="city" onChange={this.handleChange} value={form?form.address.city:''}/>
                            <br/>
                            <label htmlFor="zipcode">zipcode</label>
                            <input className="form-control" type="text" name="zipcode" id="zipcode" onChange={this.handleChange} value={form?form.address.zipcode:''}/>
                            <br/>
                            <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{ display: 'none' }}
                            onChange={this.handleFileChange}/>

                            <button className="btn btn-success"
                            onClick={() => this.handlePictureClick()}>Imagen</button>

                            <input 
                            type="text"
                            name="image"
                            id="image"
                            value={form?form.image:''}
                            onBlur={this.handleChange}/>

                        </div>

                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Está seguro de eliminar el superheroe {form && form.superhero}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger"
                        onClick={() => this.peticionesDelete()}>Sí</button>
                        <button className="btn btn-secundary"
                        onClick={() => this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Usuarios;
