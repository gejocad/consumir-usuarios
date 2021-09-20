import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import {fileUpload} from '../helpers/fileUpload';

const url = "https://jsonplaceholder.typicode.com/users";


class Heroes extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id: '',
            name: '',
            superhero: '',
            publisher: '',
            alter_ego: '',
            first_appearance: '',
            image: '',
            tipoModal: ''
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

    handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

   handleFileChange = (e) => {
        const file = e.target.files[0];
        fileUpload(file).then(response => {
            document.getElementById('image').value = response;
            console.log(response);  
        }).catch(error => {
            console.log(error.message);
        })      
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
                <br />
                <button className="btn btn-success"
                onClick={() => {this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}>Agregar Heroe</button>
                <br /> <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>superhero</th>
                            <th>publisher</th>
                            <th>alter_ego</th>
                            <th>first_appearance</th>
                            <th>image</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(heroe => {
                                return (
                                    <tr>
                                         <td>{heroe.id}</td>
                                         <td>{heroe.name}</td>
                                         <td>{heroe.superhero}</td>
                                         <td>{heroe.publisher}</td>
                                         <td>{heroe.alter_ego}</td>
                                         <td>{heroe.first_appearance}</td>
                                         <td><img src={heroe.image} width="50px"/></td>
                                         <button className="btn btn-primary"
                                         onClick={() => {this.seleccionarHeroe(heroe);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                         {" "}
                                         <button className="btn btn-danger"
                                         onClick={() => {this.seleccionarHeroe(heroe);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                            <label htmlFor="superhero">superhero</label>
                            <input className="form-control" type="text" name="superhero" id="superhero" onChange={this.handleChange} value={form?form.superhero:''}/>
                            <br/>
                            <label htmlFor="publisher">publisher</label>
                            <input className="form-control" type="text" name="publisher" id="publisher" onChange={this.handleChange} value={form?form.publisher:''}/>
                            <br/>
                            <label htmlFor="alter_ego">alter_ego</label>
                            <input className="form-control" type="text" name="alter_ego" id="alter_ego" onChange={this.handleChange} value={form?form.alter_ego:''}/>
                            <br/>
                            <label htmlFor="first_appearance">first_appearance</label>
                            <input className="form-control" type="text" name="first_appearance" id="first_appearance" onChange={this.handleChange} value={form?form.first_appearance:''}/>
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
                    <ModalFooter>
                        {this.state.tipoModal=='insertar'}
                        <button className="btn btn-success" onClick={() => this.peticionesPost()}>
                            Insertar
                        </button>
                        <button className="btn btn-primary"
                        onClick={() => this.peticionesPut()}>
                            Actualizar
                        </button>
                        <button className="btn btn-danger"
                           onClick={() => this.modalInsertar()}>
                            Cancelar
                        </button>
                    </ModalFooter>
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

export default Heroes;
