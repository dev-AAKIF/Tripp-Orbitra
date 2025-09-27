import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  cloudinaryUrl: {
    type: String,
    default: null
  },
  totalCost: {
    type: Number,
    default: 0
  },
  // Add new fields for currency
  costCurrency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR', 'GBP', 'OTHER']
  },
  costFormatted: {
    type: String,
    default: '₹0'
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  activitiesCount: {
    type: Number,
    default: 0
  },
  activities: [{
    type: String
  }],
  postedBy: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;