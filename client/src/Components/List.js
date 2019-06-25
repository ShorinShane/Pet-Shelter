import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class List extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            petShelters: []
        }
    }
    
    sortpetShelters(arr){
        for(let i=0; i<arr.length; i++) {
            for(let j=0; j<arr.length-i-1; j++){
            if(arr[j].type.length < arr[j+1].type.length) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
            }
        }
        return arr;
    }

    componentDidMount = () => {
        axios.get("/api/petShelters")
            .then( Response => {
                this.setState({petShelters: this.sortpetShelters(Response.data.petShelters)});
            })
            .catch( err => {
                console.log(err);
            });
    }
    
    render(){
        return(
            <>
                <div className="listHeader">
                    <h3>These pets are looking for a home!</h3>
                    <Link to="/pets/create/new">Add a pet to the shelter</Link>
                </div>
                <table className="petShelter">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.petShelters.map( petShelter =>
                                    <tr key={petShelter._id}>
                                        <td>{petShelter.name}</td>
                                        <td>{petShelter.type}</td>
                                        <td>
                                            <Link to={`/pets/${petShelter._id}`}>
                                                <button className="btn-detail">Details</button>
                                            </Link>
                                            <Link to={`/pets/${petShelter._id}/edit`}>
                                                <button className="btn-edit">Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default List