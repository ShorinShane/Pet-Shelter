import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Detail extends Component {

    constructor(props) {
        super(props);
        this.button = {diabled: false}
        this.state = {
            petShelter: {
                name: "",
                type: "",
                description: "",
                skill1: "",
                skill2: "",
                skill3: "",
                likes: 0,
            },
            errors: {}
        }
    }

    
    componentDidMount = () => {
        axios.get(`http://localhost:8000/api/petShelters/${this.props.match.params._id}`)
        .then( Response => {
            this.setState({petShelter: Response.data.petShelter});
        })
        .catch( err => {
            console.log(err);
        });
    }
    
    delete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/petShelters/${this.state.petShelter._id}`)
        .then( Response => {
            this.componentDidMount();
            this.props.history.push("/pets");
        });
    }

    add = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/petShelters/${this.state.petShelter._id}`, this.state.petShelter)
        .then( Response => {
            this.state.petShelter.likes += 1;
            this.props.history.push(`/pets/${this.state.petShelter._id}`);
        });
    }

    click() {
        this.setState({disabled : !this.button.disabled})
    }

    render() {
        return (
            <div>
                <Link className="homeLink" to="/pets">Home</Link>
                <div>
                    <h2>Details about {this.state.petShelter.name}</h2>
                    <div>
                        <h2>Pet type:</h2> <h4>{this.state.petShelter.type}</h4>
                    </div>
                    <div>
                        <h2>Description:</h2> <h4>{this.state.petShelter.description}</h4>
                    </div>
                    <div>
                        <h2>Skills:</h2> <h4>{this.state.petShelter.skill1}</h4>&nbsp;&nbsp;&nbsp;
                        <h4>{this.state.petShelter.skill2}</h4>&nbsp;&nbsp;&nbsp;
                        <h4>{this.state.petShelter.skill3}</h4>
                    </div>
                        <h2>Likes: {this.state.petShelter.likes}</h2><br></br><br></br>
                    <form className="detes" onSubmit={this.add}>
                        <input type="submit" onClick={this.click.bind(this)} className="btn-like" value="Like this pet" />
                    </form>
                    <form className="detes" onSubmit={this.delete}>
                        <input type="submit" className="btn-adopt" value="Adopt this pet!" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Detail