const mongoose = require("mongoose");
const petShelter = mongoose.model("petShelter");

class petShelters {
    getAll(request, respond){
        petShelter.find({}, (err, petShelters) => {
            if(err) { console.log(err); }
            respond.json({status: 200, petShelters: petShelters});
        });
    }
    create(request, respond){
        let pS = new petShelter(request.body);
        pS.save( err => {
            if(err) {
                respond.json({status: 200, errors: err});
            }else{
                respond.json({status: 200});
            }
        });
    }
    getOne(request, respond){
        petShelter.findOne({_id: request.params._id}, (err, petShelter) => {
            if(err) { console.log(err); }
            respond.json({status: 200, petShelter: petShelter});
        });
    }f
    update(request, respond){
        petShelter.findOneAndUpdate({_id: request.params._id}, request.body, {runValidators: true}, err => {
            if(err) {
                respond.json({status: 200, errors: err});
            } else {
                respond.json({status: 200});
            }
        });
    }
    delete(request, respond){
        petShelter.findOneAndDelete({_id: request.params._id}, err => {
            if(err) { console.log(err); }
            respond.json({status: 200});
        });
    }
}

module.exports = new petShelters();