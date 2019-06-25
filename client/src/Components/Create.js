import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newpetShelter: {
                name: "",
                type: '',
                description: "",
                skill1: "",
                skill2: "",
                skill3: "",
                likes: 0,
            },
            errors: {}
        }
    }

    change = (key, e) => {
        let pS = {...this.state.newpetShelter};
        pS[key] = e.target.value;
        this.setState({newpetShelter: pS});
    }

    makepetShelter = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/petShelters", this.state.newpetShelter)
        .then( Response => {
            if(Response.data.errors){
            this.setState({errors: Response.data.errors.errors})
            } else {
            this.props.history.push("/pets");
            }
        });
    }

    render() {
        return (
        <div> 
            <h2>Know of a pet needing a home?</h2>
            {this.state.errors.name ? <p>{this.state.errors.name.message}</p>:""}
            {this.state.errors.type ? <p>{this.state.errors.type.message}</p>:""}
            {this.state.errors.description ? <p>{this.state.errors.description.message}</p>:""}
            <form onSubmit={this.makepetShelter}>
                <div className="form-group">
                    <h3>Pet Name:</h3>
                    <input className="newInput" type="text" onChange={this.change.bind(this, "name")} />
                    <h3>Pet Type:</h3>
                    <input className="newInput" type="text" onChange={this.change.bind(this, "type")} />
                    <h3>Description:</h3>
                    <input className="newInput" type="text" onChange={this.change.bind(this, "description")} />
                    <h3>Skills:</h3>
                        <label className="skillLabel">Skill 1:</label>
                        <input className="newInput" type="text" onChange={this.change.bind(this, "skill1")} /><br></br>
                        <label className="skillLabel">Skill 2:</label>
                        <input className="newInput" type="text" onChange={this.change.bind(this, "skill2")} /><br></br>
                        <label className="skillLabel">Skill 3:</label>
                        <input className="newInput" type="text" onChange={this.change.bind(this, "skill3")} /><br></br>
                    <input type="submit" className="btn-create" value="Add pet" />
                    <Link to="/pets"><button className="btn-create">Cancel</button></Link>
                </div>
            </form>
        </div>
        )
    }
}

export default Create
