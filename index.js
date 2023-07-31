const express = require("express");
const multer = require('multer');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();
const twilio = require('twilio');
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const accountSid = 'AC6118945ca9cf287721cf42b5fb4b2410';
const authToken = 'd533f1c358f3412a7ebdb95547cb0f37';
const twilioPhoneNumber = '+14327772068';


const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l8akpwj.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lrutku6.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const client2 = twilio(accountSid, authToken);

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
    const scholarshipProgramCollection = client.db("Organization").collection("scholarships");
    const verifyProgramCollection = client.db("Organization").collection("donationVerifications");


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

    app.post('/sendSMSNotification', (req, res) => {
      const { phoneNumber, message, } = req.body;

      client2.messages
        .create({
          body: message,
          from: twilioPhoneNumber,
          to: phoneNumber,
        })
        .then((message) => {
          console.log('SMS notification sent:', message.sid);
          res.status(200).json({ success: true, message: 'SMS notification sent successfully' });
        })
        .catch((error) => {
          console.error('Error sending SMS notification:', error);
          res.status(500).json({ success: false, message: 'Error sending SMS notification' });
        });
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
    app.post("/scholarshipProgram", async (req, res) => {
      const user = req.body;
      const result = await scholarshipProgramCollection.insertOne(user);
      res.send(result);
    });
    app.get("/scholarshipProgram", async (req, res) => {
      const query = {};
      const result = await verifyProgramCollection.find(query).toArray();

      res.send(result);
    });

    app.post("/verify", async (req, res) => {
      const user = req.body;
      const result = await verifyProgramCollection.insertOne(user);
      res.send(result);
    });
    app.get("/verify", async (req, res) => {
      const query = {};
      const result = await verifyProgramCollection.find(query).toArray();

      res.send(result);
    });


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
    // GET /most-frequent-location
    app.get('/most-frequent-donation-area', async (req, res) => {
      try {
        const mostFrequentArea = await liveFoodDonateCollection
          .aggregate([
            {
              $group: {
                _id: '$locationName',
                count: { $sum: 1 },
              },
            },
            {
              $sort: { count: -1 },
            },
            {
              $limit: 1, // Return the area with the highest count
            },
          ])
          .toArray();

        if (mostFrequentArea.length > 0) {
          res.json(mostFrequentArea[0]);
        } else {
          res.json({ message: 'No data available' });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
    });
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
