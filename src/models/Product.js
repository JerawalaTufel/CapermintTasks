const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    image: { type: String },
}, {
    timestamps : true
});

module.exports = mongoose.model('Product', productSchema);
