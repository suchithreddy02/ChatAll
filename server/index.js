const express = require("express");
const mongoose = require('mongoose')
const User = require("./models/User")
const userData = require('./models/userData')
const bodyParser = require('body-parser');

const app = express();
const PORT =  4000;

const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});


//connecting to mongoose database
mongoose.connect('mongodb://127.0.0.1:27017/chatAppDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
   console.error('MongoDb connection error: ',error)
})


function getUserData(users) {
 const usersArray = users.map((user) => ({
    userName: user.userName,
    socketID: user.socketID
  }))
  return usersArray
}


socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
    console.log("receved msg: ",data)
  });

  socket.on('newUser', async (data) => {
    const { userName, socketID } = data
    const newUserData = new userData({ userName, socketID })
    await newUserData.save()
    const users =  await userData.find({})
    const usersArray = getUserData(users);
    console.log('new usersdata:',usersArray)
    socketIO.emit('newUserResponse', usersArray);

    
  });

  socket.on('removeUser', async (data) => {
    
    const { userName, socketID } = data
    try {
      console.log('socketID is',socketID)
      await userData.deleteOne({ socketID });
      console.log('User remvoed successfully')
    }
    catch(err) {
      console.error('Error removing user:',err)
    }
    const users =  await userData.find({})
    const usersArray = getUserData(users);
    console.log('afterDelete data:',usersArray)
    socketIO.emit('newUserResponse', usersArray);
  })
  


  socket.on("disconnect", async () => {
    console.log("🔥: A user disconnected");

    try {
      console.log('socketID is',socket.id)
      await userData.deleteOne({ socketID: socket.id });
      console.log('User remvoed successfully')
    }
    catch(err) {
      console.error('Error removing user:',err)
    }
    const users =  await userData.find({})
    const usersArray = getUserData(users);
    console.log('afterDelete data:',usersArray)
    socketIO.emit('newUserResponse', usersArray);
    socket.disconnect();
  });
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.get("/userData", async (req, res) => {
  const users =  await userData.find({})
  const usersArray = getUserData(users);
  res.json(usersArray)
})

app.get("/delete", async (req, res) => {
  await userData.deleteMany({})
  res.status(200).json({message: "deleted all data"})
})


app.post('/register', async (req, res) => {
  
  try {

    console.log(req.body)

    const { userName } = req.body
    const existingUser = await User.findOne({ userName })
    
    if (existingUser)
    {
      res.status(201).json(existingUser.userName)
    }
    else
    {
      const user = new User({ userName })
      await user.save()
      res.status(201).json(user)
      
    }
   
  }
  catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to create user'})
  }
})




http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
