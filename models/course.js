const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    teacher: [{
        type: Schema.Types.ObjectId, 
        ref: 'teachers', required: true
    }],

    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    
    price: {
        type: String,
        required: true,
    },

    imageUrl: { 
        type: String, 
        required: true },

    sections: [
        {
            section_name: {
                type: String
            },
            videos: [
                {
                    video_name: {
                        type: String
                    },
                    video_url: {
                        type: String
                    },
                }
            ]
        }
    ]
})

module.exports = mongoose.model("courses", courseSchema);
