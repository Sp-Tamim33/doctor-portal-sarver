const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//Middlewares
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yn8go.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceDate = client.db("servicedb").collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceDate.find(query);
            const service = await cursor.toArray();
            res.send(service)
        })

    } finally {
        console.log('doctor db connected');
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Doctor Portal Running')
})

app.listen(port, () => {
    console.log(`Doctor Portal Running in ${port}`)
})