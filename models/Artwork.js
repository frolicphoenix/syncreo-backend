// models/Artwork.js
const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    description: String,
    imageUrl: String,
    price: Number,
    category: String,
    style: String,
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Artwork', ArtworkSchema);
