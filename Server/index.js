const express = require('express');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



const verifyJWT = (req, res, next) =>{
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).send({error: true, message: 'unauthorized access'})
  }
  //bearer token
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded) =>{
    if(err){
      
      return res.status(401).send({error: true, message: 'unauthorized access'})
    }
    else{
      req.decoded = decoded;
      console.log('verify jwt - ', decoded)
      next();
    }
  })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jz0ivtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const userCollection = client.db('TaskManagerDB').collection('users');
    const taskCollection = client.db("TaskManagerDB").collection("tasks");

    
    app.post('/jwt',(req,res)=>{
      const user = req.body
      console.log('hitted post api ',user)
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1hr'})
      
      console.log(token)
      res.send({token})
    })

    app.post('/signup', async(req,res) =>{
      const user = req.body;
    
      const exist = await userCollection.findOne({name:user.name})
      console.log('exist is -> ',exist)
      const result = {name: user.name, password: user.pass}
      console.log(result);
      if(!exist){
        const result = await userCollection.insertOne({name: user.name, password:user.pass})
        console.log('this result after insert in database -> ',result)
        res.send(result)
      }
      else{
        console.log('name is already exists')
        res.status(500).json({ error: 'user name is already exists...' });
      }
      console.log(user)
    })

    app.post('/signin', verifyJWT, async(req,res) =>{
      const user = req.body;
      console.log('user name is -> ',user.name)
      const exist = await userCollection.findOne({name:user.name})
      console.log('existing data -> ',exist)
      if(exist){
        if(user.pass === exist.password){
          console.log('successfully login')
        }
        else{
          console.log('password does not match')
        }
      }
      else{
        console.log('this name not exist')
      }
    })

    app.get('/tasks', async(req,res) =>{
        const data = await taskCollection.find().toArray();
        console.log('data -> ',data)
        res.send(data);
    })

    app.post('/addTask', async(req,res) =>{
        const task = req.body;
        console.log(task)

        const result = await taskCollection.insertOne(task)
        console.log('result is -> ',result);
        res.send(result)
    })

    //update task
    app.put('/task/:id', async (req, res) => {
        try {
          const { id } = req.params;
          console.log('updated id -> ',id)
          console.log('updated data -> ', req.body)
          const {title,description,dueDate, isCompleted} = req.body;
          let updatedTask;
          if(isCompleted){
            updatedTask = {isCompleted: !isCompleted }
          }
          else{
             updatedTask = {title,description,dueDate}
          }
          console.log('updated isCompleted -> ', isCompleted)
      
          const result = await taskCollection.findOneAndUpdate(
            { _id: new ObjectId(id)},
            { $set:  updatedTask}
          );

          console.log('updated result -> ',result)
      
      
          res.json({ message: 'Task updated successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });

    app.delete('/task/:id', async(req,res) =>{
      const id = req.params.id;
      console.log('delete id -> ', id)
      const query = {_id: new ObjectId(id)};
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('',(req,res) => {
    res.send('Task_management Server is running')
})



app.listen(port, () =>{
    console.log(`Task management server is running on port `)
})