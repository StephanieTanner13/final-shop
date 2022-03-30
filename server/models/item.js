const mongoose = require('mongoose');

const itemSchema =  mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model('Item', itemSchema);