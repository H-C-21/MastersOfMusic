const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const conn = mongoose.connect('mongodb+srv://rehan:3456tyui@ecommerce-web.ljy5jgh.mongodb.net/Music_Mastery');
        console.log('connection established');
    }
    catch (error) {
        console.log('Error occured');
    }

}
module.exports = connectDb;