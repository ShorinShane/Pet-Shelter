const express = require("express"),
        cors = require("cors"),
        bp = require("body-parser");
        app = express(),
        DB_NAME = "petShelter",
        port = 8000,

app.use(bp.json());
app.use(cors());
app.use(express.static(__dirname + "/client/build"));


require("./server/utils/mongoose")(DB_NAME);
require("./server/utils/routes")(app);

app.all('*', (request, respond, next) => {
    respond.sendFile(__dirname + "/client/build/index.html");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
