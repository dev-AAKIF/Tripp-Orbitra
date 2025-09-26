// // import mongoose from "mongoose";

// // const ItenarySchema = new mongoose.Schema({
// //   // userId: ObjectId,
// //   // title: String,
// //   // startDate: Date,
// //   // endDate: Date,
// //   // activities: [
// //   //   {
// //   //     name: String,
// //   //     cost: Number,
// //   //     durationHours: Number
// //   //   }
// //   // ],
// //   // totalCost: Number,
// //   // totalDurationDays: Number,
// //   // score: Number
// //   filename: String,
// //   totalCost: String,
// //   totalDuration: String,
// //   numberOfActivities: String,
// //   extractedText: String,
// //   uploadDate: { type: Date, default: Date.now }
// // }); 

// // const Itenary = mongoose.model("Itenary", ItenarySchema);

// // export default Itenary;

// import mongoose from "mongoose";

// const itinerarySchema = new mongoose.Schema({
//   filename: String,
//   cloudinaryUrl: String,
//   totalCost: Number,
//   totalDuration: Number,   // hours or days
//   activitiesCount: Number,
//   activities: [String],
//   postedBy: {
//     type: String,
//     required: true
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// const Itinerary = mongoose.model("Itenary", itinerarySchema);

// export default Itinerary;  

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