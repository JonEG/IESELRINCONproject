import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import { Redirect } from "react-router-dom";
import ProfessionalService from '../services/professional.service';
import ProfileController from '../controllers/profileController';
import Swal from 'sweetalert2';
import $ from 'jquery';
import Nav from '../components/nav';


class profileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            departments: [],
            roles: [],
            tutors: [],
            id: null,
            name: null,
            departmentId: null,
            roleId: null,
            email: sessionStorage.getItem("userEmail"),
            tutorId: null,
            comment: "",
            image: null,
            imageId: null
        };
    }

    async componentDidMount() {
        this.isUserRegistered();
        //Dropdowns
        ProfileController.loadDepartments().then(each => this.setState({departments: each}));
        ProfileController.loadRoles().then(each => this.setState({roles: each}));
        ProfileController.loadTutors().then(each => this.setState({tutors: each}));
        //Professional info
        await ProfileController.queryProfessionals().then((res)=> {
            this.setState(res);
            this.setearImagenEnHTML();
        });
        
    }   
    
    isUserRegistered() {
        if (sessionStorage.getItem('isUserRegistered') == 'false') {
            this.setState({ redirect: '/crear-perfil' });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        } 
        return (
            <div><Nav/>
            <div class="container p-4">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <div class="row">
                    <div class="col-lg-9">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group ">
                                    <input type="text"
                                        value={this.state.name}
                                        onChange={(value) => this.setState({ name: value.target.value })}
                                        class="form-control" name="nombre" placeholder="Nombre" autofocus
                                    />
                                </div>

                                <div class="row">
                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <select class="form-control"
                                                value={this.state.departmentId}
                                                onChange={(value) => this.setState({ departmentId: value.target.value })} >
                                                <option selected disabled>Departamento</option>
                                                {this.state.departments}

                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2">
                                        <div class="form-group">
                                            <select class="form-control"
                                                value={this.state.roleId}
                                                onChange={(value) => this.setState({ roleId: value.target.value })} >
                                                <option selected disabled >Rol</option>
                                                {this.state.roles}
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-lg-3">
                                        <div class="form-group">
                                            <select class="form-control"
                                                value={this.state.tutorId}
                                                onChange={(value) => this.setState({ tutorId: value.target.value })} >
                                                <option selected disabled >Tutoría</option>
                                                {this.state.tutors}
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group">
                                    <textarea class="form-control"
                                        value={this.state.comment}
                                        onChange={(value) => this.setState({ comment: value.target.value })}
                                        placeholder="Introduzca si lo desea algún comentario: Me gusta J"
                                        rows="3"></textarea>
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-success" onClick={() => this.updateProfessional()}>Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <form class="md-form">
                                    <div class="file-field">
                                        <div class="md-4" >
                                            <img src={require("../images/profile-picture.jpg")}
                                                ref={profilePicture => this.myProfilePicture = profilePicture}
                                                id="blah"
                                                class="rounded-circle z-depth-1-half avatar-pic img-fluid img-thumbnail" alt="avatar"
                                            />

                                            <div style={{ marginTop: "10px" }} class="d-flex" >
                                                <div class="btn btn-mdb-color btn-rounded float-left custom-file">
                                                    <input style={{ width: "100%" }} ref={(myElement) => this.myFileElement = myElement}
                                                        type="file"
                                                        id="imgInput"
                                                        className="custom-file-input btn btn-primary"
                                                        onChange={(value) => { this.readURL(value.target) }}
                                                    />
                                                    <label class="custom-file-label" for="customFile">Perfil</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }


    readURL(input) {
        if (input.files && input.files[0]) {
            const myValue = input.files[0];

            if (myValue.type.includes("image")) {
                const reader = new FileReader();
                let miImagen = {
                    name: myValue.name,
                    type: myValue.type
                }

                reader.readAsDataURL(myValue); 
                reader.onload = async (event) => {
                    miImagen.data = await event.target.result;
                    this.state.image = miImagen;
                    $('#blah').attr('src', this.state.image.data);
                }
                reader.onerror = (err) => {
                    console.error('Error en lectura de imagen --> '+err);
                }
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Sólo archivos de tipo imagen!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    setearImagenEnHTML() {
        if (this.state.image) {
            //Setear imagen en html
            $('#blah').attr('src', this.state.image.data);
        }
    }

    validateFields() {
        let emptyFields = "";
        let count = 0;
        const nombre = this.state.name;

        if (nombre.replace(/\s/g, "").length == 0) {
            emptyFields += " Nombre ";
            count++;
        }
        if (this.state.departmentId == null) {
            emptyFields += " Departamento ";
            count++;
        }
        if (this.state.roleId == null) {
            emptyFields += " Rol ";
            count++;
        }

        //If there are errors
        if (count > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: (count == 1 ? "Falta el campo" : "Faltan los campos: ") + emptyFields,
                showConfirmButton: false,
                timer: 2000
            })
            return false;
        } else {
            return true;
        }

    }

    updateProfessional() {
        if (this.validateFields() == false) {
            return;
        }

        // parametros de datos post
        const datapost = {
            id: this.state.id,
            name: this.state.name,
            departmentId: this.state.departmentId,
            roleId: this.state.roleId,
            email: this.state.email,
            tutorId: this.state.tutorId,
            comment: this.state.comment,
            image: this.state.image,
            imageId: this.state.imageId
        }

        ProfessionalService.update(datapost)
            .then(res => {
                if (res.data.success) {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Profesional actualizado correctamente!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
                else {
                    console.error("Error");
                }
            }).catch(error => {
                console.error("Error 34 " + error);
            });
    }
}



export default profileComponent;