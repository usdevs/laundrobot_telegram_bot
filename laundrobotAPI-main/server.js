import express from 'express'
import mongoose from 'mongoose'
import Dryer from './items/dryerModel.js'
import Washer from './items/washerModel.js'
import cors from 'cors'
import config from './config.js'

const app = express()

app.use(cors())

app.use(express.json())

try {
    console.log("Connecting to MongoDB... Please wait")
    await mongoose.connect(config.mongodbConnection)
    console.log('✅ Connected to MongoDB')

    mongoose.connection.on('error', e => {
        console.error('❌ MongoDB connection error: ', e.message)
    });
} catch (e) {
    console.error('❌ Failed to connect to MongoDB: ', e.message)
    process.exit(0)
}

// Routes

// Ping
app.get('/', (req, res) => {
    res.send('hello Laundrobot Api')
})

// Delete
// TODO: to make more secure
app.get('/reset', async (req, res) => {
    await Washer.deleteMany({})
    await Dryer.deleteMany({})

    const washers = [
        "Elm Washer 1", 
        "Elm Washer 2", 
        "Elm Washer 3", 
        "Elm Washer 4", 
        "Elm Washer 5", 
        "Elm Washer 6",
        // "Saga Washer 1", 
        // "Saga Washer 2", 
        // "Saga Washer 3", 
        // "Saga Washer 4", 
        // "Saga Washer 5", 
        // "Saga Washer 6"
    ]
    
    const dryers = [
        "Elm Dryer 1", 
        "Elm Dryer 2", 
        "Elm Dryer 3", 
        "Elm Dryer 4", 
        "Elm Dryer 5", 
        "Elm Dryer 6", 
        // "Saga Dryer 1", 
        // "Saga Dryer 2", 
        // "Saga Dryer 3", 
        // "Saga Dryer 4", 
        // "Saga Dryer 5", 
        // "Saga Dryer 6", 
    ]

    for (const washer in washers) {
        await Washer.create({name: washers[washer], timeLeftUserInput: 0})
    }
    for (const dryer in dryers) {
        await Dryer.create({name: dryers[dryer], timeLeftUserInput: 0})
    }
    res.send('reset')
})



// Add a washer
app.post('/addWasher', async(req, res) => {
    try {
        const washer = await Washer.create(req.body)
        res.status(200).json(washer);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// Add a dryer 
app.post('/addDryer', async(req, res) => {
    try {
        const dryer = await Dryer.create(req.body)
        res.status(200).json(dryer);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

// Get all washers
app.get('/washers', async(req, res) => {
    try {
        const washers = await Washer.find({}); // get all products
        //console.log('hi')
        res.status(200).json(washers)
    } catch (error) {
        //console.log('oh')
        res.status(500).json({message:error.message})
    }
})

// Get all dryers
app.get('/dryers', async(req, res) => {
    try {
        const dryers = await Dryer.find({}); // get all products
        res.status(200).json(dryers)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


// Update a washer
app.put('/washers/update', async(req, res) => {
    try{
        const washer_arr = await Washer.find({ "name": req.body["name"]});
        if (!washer_arr){
            return res.status(404).json({message: `cannot find any washers with this body ${req.body}`})
        }
        //console.log(req.body)
        let req_body_copy = req.body;
        let new_washer = washer_arr[0]
        //.log(req.body)
        new_washer['timeLeftUserInput'] = req.body['timeLeftUserInput']
        new_washer['endTime'] = req.body['endTime']
        //console.log(new_washer)
        //console.log('updated')
        const updatedwasher = await Washer.findByIdAndUpdate(new_washer['_id'], new_washer);
        res.status(200).json(updatedwasher);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// Update a dryer
app.put('/dryers/update', async(req, res) => {
    try{
        const dryer_arr = await Dryer.find({ "name": req.body["name"]});
        if (!dryer_arr){
            return res.status(404).json({message: `cannot find any washers with this body ${req.body}`})
        }
        //console.log(req.body)
        let req_body_copy = req.body;
        let new_dryer = dryer_arr[0]
        
        new_dryer['timeLeftUserInput'] = req.body['timeLeftUserInput']
        new_dryer['endTime'] = req.body['endTime']
        //console.log(new_dryer)
        const updateddryer = await Dryer.findByIdAndUpdate(new_dryer['_id'], new_dryer);
        res.status(200).json(updateddryer);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.listen(config.port, () => {
    console.log(`✅ Node API app is running on http://localhost:${config.port}`)
}).on('error', (e) => {
    console.error('❌ Failed to start node server: ', e.message)
    // We exit with 0 here because we don't need to clutter the console with stack trace
    process.exit(0)
})