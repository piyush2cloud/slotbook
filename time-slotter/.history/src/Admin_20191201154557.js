import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form, Container, Row} from "react-bootstrap";
import './App.css';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class Admin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        usersList:["ok@ok.com", "piyush2official@gmail.com", "piysush2official@gmail.com", "piyusassh2official@gmail.com", "piyuaash2official@gmail.com", "piyush2official@gmail.com", "piyush2official@gmail.com", "piyasaush2official@gmail.com", "ok@qq.com", "pl@pl.com"]
      };
    }

    async componentDidMount(){
        await this.getAllUsers();
    }

    getAllUsers = ()=>{
        axios.get("http://localhost:3000/getAllusers")
        .then((response) => {
            debugger
            let userList = response.data.a.map((elem)=>{
                return elem.username;
            })
            
            this.setState({
                userList:userList
            });
            console.log(userList);
        },(error)=>{
        });
    }
  
    handleSubmit = event => {
        event.preventDefault();  
    }
  
    render() {
      alert(this.state.userList);
      return (
        <Container className="Login">
            <Form.Label>Admin Control</Form.Label>
            <form onSubmit={this.handleSubmit}>

                <Form.Group controlId="myemployee">
                    <Form.Label>Select Employee</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange}>
                        {this.state.usersList.map((elem)=>{
                            return (<option>{elem}</option>)
                        })}
                    </Form.Control>
                </Form.Group>

                {/* <Form.Group controlId="myrole">
                    <Form.Label>Select Role</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange}>
                        <option>employee</option>
                        <option>lab</option>
                        <option>Admin</option>
                    </Form.Control>
                </Form.Group> */}
            </form>
        </Container>
      );
    }
  }

  export default (withRouter)(Admin)