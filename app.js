

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const users = require('./routes/users');
const thresholds = require('./routes/thresholds');
const sensors = require('./routes/sensors');
const http = require('http');
const Sensor = require('./models/sensormodel');
var moment = require('moment');

// Connect To Database
//mongoose.connect(config.database);
mongoose.Promise = global.Promise;
const options = {
  promiseLibrary: global.Promise,
  useMongoClient: true,
};
mongoose.connection.openUri(config.database, options);


// Port Number
const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
var io = require('socket.io').listen(server);


// Body Parser Middleware
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// CORS Middleware
app.use(cors());
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/sensors', sensors);
app.use('/thresholds', thresholds);
app.use('/users', users);

app.get('/', (req, res) => {
  console.log('user connected1');

  res.send(200,"Hello App");
});
// Start Server

//app.set('socket-io',io);
// app.listen(port, () => {
//     console.log('Server started on port '+port);
//   });
// Make io accessible to our router


server.listen(port, () => console.log(`API running on localhost:${port}`));
// io.sockets.on('connection', function(socket){
//   console.log('Socket connected');
//   // Socket event for gist created
//   socket.on('gistSaved', function(gistSaved){
//     io.emit('gistSaved', gistSaved);
//     console.log("saved");
//   });

//   // Socket event for gist updated
//   socket.on('gistUpdated', function(gistUpdated){
//     io.emit('gistUpdated', gistUpdated);
//   });
// });

io.on('connection', (socket) => {

  console.log('user connected');

  (function () {
    Sensor.getLastValue((err, sensorValues) => {
      if (err) {
        // console.log("error///get las value");
        // socket.emit("data", err[0]['values']);
        // let vars = err[0]['values']['gas'] = Math.floor(Math.random() * (Math.floor(900) - Math.ceil(200))) + 200;
        // err[0]['values']['motion'] = Math.floor(Math.random() * (Math.floor(900) - Math.ceil(200))) + 250;
        // err[0]['values']['distance'] = Math.floor(Math.random() * (Math.floor(900) - Math.ceil(200))) + 150;
        // //var check = moment(new Date("").getFullYear, 'YYYY-MM-DD HH:mm:ss Z')
        
        // err[0]['date'] = new Date();
        // console.log("Vars:::"+vars);
         //console.log("ERR:::"+err);
         console.log("if");
        // socket.emit("data", err[0]);
       
      } else {

        
        
         console.log("else");
         console.log(sensorValues[0]);
         socket.emit("data", sensorValues[0]);
      }
    });
    setTimeout(arguments.callee, 10000);
  })();




  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    console.log(message);

    console.log('inside message-server');
    // Function above that stores the message in the database

  });



});