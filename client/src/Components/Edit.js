import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            petShelter: {
                name: "",
                type: '',
                description: "",
                skill1: "",
                skill2: "",
                skill3: "",
            },
            errors: {}
        }
    }

    componentDidMount = () => {
        console.log(this.props.match.params._id);
        axios.get(`/api/petShelters/${this.props.match.params._id}`)
            .then( Response => {
                this.setState({petShelter: Response.data.petShelter});
            })
        .catch( err => {
            console.log(err);
            });
        }

    change = (key, e) => {
        let pS = {...this.state.petShelter};
        pS[key] = e.target.value;
        this.setState({petShelter: pS});
    }

    updatepetShelter = (e) => {
        e.preventDefault();
        axios.put(`/api/petShelters/${this.state.petShelter._id}`, this.state.petShelter)
        .then( Response => {
            if(Response.data.errors){
            this.setState({errors: Response.data.errors.errors})
            } else {
            this.props.history.push(`/pets/${this.state.petShelter._id}`);
            }
        });
    }

    render() {
        let i = `/pets/${this.state.petShelter._id}`;
        return (
        <div>
            <h2>Edit this pet</h2>
            {this.state.errors.name ? <p>{this.state.errors.name.message}</p>:""}
            {this.state.errors.type ? <p>{this.state.errors.type.message}</p>:""}
            {this.state.errors.description ? <p>{this.state.errors.description.message}</p>:""}
            <form onSubmit={this.updatepetShelter}>
                    <div className="form-group">
                        <h3>Pet Name:</h3>
                        <input className="newInput" type="text" onChange={this.change.bind(this, "name")} value={this.state.petShelter.name} />
                        <h3>Pet Type:</h3>
                        <input className="newInput" type="text" onChange={this.change.bind(this, "type")} value={this.state.petShelter.type} />
                        <h3>Description:</h3>
                        <input className="newInput" type="text" onChange={this.change.bind(this, "description")} value={this.state.petShelter.description} />
                        <h3>Skills:</h3>
                            <label className="skillLabel">Skill 1:</label>
                            <input className="newInput" type="text" onChange={this.change.bind(this, "skill1")} value={this.state.petShelter.skill1} /><br></br>
                            <label className="skillLabel">Skill 2:</label>
                            <input className="newInput" type="text" onChange={this.change.bind(this, "skill2")} value={this.state.petShelter.skill2} /><br></br>
                            <label className="skillLabel">Skill 3:</label>
                            <input className="newInput" type="text" onChange={this.change.bind(this, "skill3")} value={this.state.petShelter.skill3} /><br></br>
                        <input type="submit" className="btn-create" value="Edit pet" />
                        <Link to = {i} ><button className="btn-create">Cancel</button></Link>
                    </div>
                </form>
            </div>
            )
        }
    }

export default Edit