const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        // required: true,
    },

    teacher: [{
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        // required: true
    }],

    description: {
        type: String,
        // required: true,

    },
    category: {
        type: mongoose.ObjectId,
        ref: "category",

    },


    price: {
        type: String,
        default: 500,
        required: true,
    },

    imageUrl: {
        type: String,

        // required: true 
    },

    sections: [{
        type: String
    }
    ]
})

module.exports = mongoose.model("courses", courseSchema);