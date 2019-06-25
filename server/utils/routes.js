const petShelters = require('../controllers/petShelters');

module.exports = (app) => {
    app.get("/api/petShelters", petShelters.getAll);
    app.post("/api/petShelters", petShelters.create);
    app.get("/api/petShelters/:_id", petShelters.getOne);
    app.put("/api/petShelters/:_id", petShelters.update);
    app.delete("/api/petShelters/:_id", petShelters.delete);
}