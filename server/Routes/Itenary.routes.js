// import express from "express";
// import { uploadItinerary, compareItineraries } from "../Controllers/Itenary.controller.js";
// import { uploadFileField } from "../Middleware/Multer.middleware.js";

// const router = express.Router();

// // Use your custom middleware instead of creating a new multer instance
// router.post("/upload", uploadFileField, uploadItinerary);
// router.get("/compare", compareItineraries);

// export default router;

import express from "express";
import { uploadItinerary, compareItineraries, getAllItineraries } from "../Controllers/Itenary.controller.js";
import { uploadFileField } from "../Middleware/Multer.middleware.js";

const router = express.Router();

router.get("/", getAllItineraries);
router.post("/upload", uploadFileField, uploadItinerary);
router.get("/compare", compareItineraries);

export default router;