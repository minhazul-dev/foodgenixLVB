const express = require("express");
const multer = require('multer');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
const upload = multer();


const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l8akpwj.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lrutku6.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {

    const usersCollection = client.db("Organization").collection("users")
    const paymentsCollection = client.db("Organization").collection("payments");
    const volunteersCollection = client.db("Organization").collection("volunteer");
    const getInTouchCollection = client.db("Organization").collection("getInTouchMessages");
    const clothesCollection = client.db("Organization").collection("clothes");
    const multiDonationCollection = client.db("Organization").collection("multiDonation");
    const liveFoodDonateCollection = client.db("Organization").collection("liveFoodDonate");
    const liveFoodRequestCollection = client.db("Organization").collection("liveFoodRequest");
    // const fooddonateCollection = client.db("Organization").collection("fooddonate");

    // const footCollection = client.db("Organization").collection("foot");


    app.post("/addPayment", async (req, res) => {
      const user = req.body;
      const result = await paymentsCollection.insertOne(user);
      res.send(result);
    });
    app.get("/addPayment", async (req, res) => {
      const query = {};
      const result = await paymentsCollection.find(query).toArray();

      res.send(result);
    });
    app.post("/donateClothes", async (req, res) => {
      const user = req.body;
      const result = await clothesCollection.insertOne(user);
      res.send(result);
    });
    app.get("/donateClothes", async (req, res) => {
      const query = {};
      const result = await clothesCollection.find(query).toArray();

      res.send(result);
    });

    // app.post('/fooddonate', upload.none(), async (req, res) => {
    //   const user = req.body;
    //   const result = await fooddonateCollection.insertOne(user);
    //   res.send(result);
    // });
    // app.get("/fooddonate", async (req, res) => {
    //   const query = {};
    //   const result = await fooddonateCollection.find(query).toArray();

    //   res.send(result);
    // });
    app.post("/multiCategory", async (req, res) => {
      const user = req.body;
      const result = await multiDonationCollection.insertOne(user);
      res.send(result);
    });
    app.get("/multiCategory", async (req, res) => {
      const query = {};
      const result = await multiDonationCollection.find(query).toArray();

      res.send(result);
    });

    app.post("/addVolunteer", async (req, res) => {
      const user = req.body;
      const result = await volunteersCollection.insertOne(user);
      res.send(result);
    });
    app.get("/addVolunteer", async (req, res) => {
      const query = {};
      const result = await volunteersCollection.find(query).toArray();

      res.send(result);
    });
    app.post("/getInTouch", async (req, res) => {
      const user = req.body;
      const result = await getInTouchCollection.insertOne(user);
      res.send(result);
    });
    app.get("/getInTouch", async (req, res) => {
      const query = {};
      const result = await getInTouchCollection.find(query).toArray();

      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    //getting the organizations information
    app.get('/users', (req, res) => {
      usersCollection.find()
        .toArray((err, items) => {
          res.send(items)

        })
    })

    //donate rq
    // app.post("/liveFoodDonate", async (req, res) => {
    //   const { locationName, organizationName, phoneNumber } = req.body;

    //   try {
    //     // Connect to the "fooddonate" collection
    //     const liveFoodDonateCollection = await connectToCollection("liveFoodDonate");

    //     // Insert the donation data into the collection
    //     const result = await liveFoodDonateCollection.insertOne({
    //       locationName,
    //       organizationName,
    //       phoneNumber,
    //     });

    //     console.log("Data saved to fooddonate collection:", result.insertedId);
    //     res.status(200).json({ message: 'Data sent successfully!' });
    //   } catch (error) {
    //     console.error('Error saving donation data:', error);
    //     res.status(500).json({ message: 'Error occurred while saving donation data' });
    //   }
    // });

    // app.post("/liveFoodRequest", async (req, res) => {
    //   const { locationName, organizationName, phoneNumber } = req.body;

    //   try {
    //     // Connect to the "fooddonate" collection
    //     const liveFoodRequestCollection = await connectToCollection("liveFoodRequest");

    //     // Insert the request data into the collection
    //     const result = await liveFoodRequestCollection.insertOne({
    //       locationName,
    //       organizationName,
    //       phoneNumber,
    //     });

    //     console.log("Data saved to fooddonate collection:", result.insertedId);
    //     res.status(200).json({ message: 'Data sent successfully!' });
    //   } catch (error) {
    //     console.error('Error saving request data:', error);
    //     res.status(500).json({ message: 'Error occurred while saving request data' });
    //   }
    // });
    //donate req
    app.post("/liveFoodDonate", async (req, res) => {
      const user = req.body;
      const result = await liveFoodDonateCollection.insertOne(user);
      res.send(result);
    });
    app.get("/liveFoodDonate", async (req, res) => {
      const query = {};
      const result = await liveFoodDonateCollection.find(query).toArray();

      res.send(result);
    });

    app.post("/liveFoodRequest", async (req, res) => {
      const user = req.body;
      const result = await liveFoodRequestCollection.insertOne(user);
      res.send(result);
    });
    app.get("/liveFoodRequest", async (req, res) => {
      const query = {};
      const result = await liveFoodRequestCollection.find(query).toArray();

      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));



app.get("/", (req, res) => {
  res.send(" server running");
});
app.listen(port, () => {
  console.log(` server running on port: ${port}`);
});








    // app.post('/addPayment', (req, res) => {
    //   const newPayment = req.body;
    //   console.log('adding new payment', newPayment);
    //   paymentsCollection.insertOne(newPayment)
    //     .then(result => {
    //       console.log('inserted count', result.insertedCount);
    //       res.send(result.insertedCount > 0)
    //     })

    // })