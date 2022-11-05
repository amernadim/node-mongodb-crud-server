const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middle were
app.use(cors());
app.use(express.json());

// user userbd2
// password 3gAwO7oecXMpdUot

const uri =
  "mongodb+srv://userbd2:3gAwO7oecXMpdUot@cluster0.p2qoups.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");

    
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // update 
    // get by id
    app.get('/user/:id' , async(req,res) => {
      const id = req.params.id ;
      const query = {_id: ObjectId(id)};
      const user = await userCollection.findOne(query);
      res.send(user)
    })

    // create 
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // update
    app.put('/user/:id' , async(req,res) => {
      const id = req.params.id;
      const filter = {_id: ObjectId(id)};
      const user = req.body;
      const option = {upset : true};
      const updateUser = {
        $set : {
          name : user.name ,
          address : user.address,
          email : user.email
        }
      }
      const result = await userCollection.updateOne(filter,updateUser,option);
      res.send(result)
    })
    
   // delete 
    app.delete('/user/:id', async(req,res) => {
      const id = req.params.id;
      // console.log(`trying to delete ${id}`);
      const query = {_id: ObjectId(id)} ;
      const result = await userCollection.deleteOne(query);
      res.send(result);
      console.log(result);
    })

  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("server is runing");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
