const mongoose = require('mongoose');

const mongo_url = 'mongodb+srv://gandhambalaraju18:Balaraju%4018@cluster0.zresrux.mongodb.net/balaraju';
const connection = mongoose.connect(mongo_url).then(() => {
    console.log("connected to database");
}).catch((error) => {
    console.log("error in connecting to database", error)
})