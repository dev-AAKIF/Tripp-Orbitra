// import fileUpload from "../Utils/fileUpload.js";
// import Itinerary from "../Models/Itenary.models.js";
// import fs from "fs";
// import path from "path";

// // Try different pdf-parse import approaches
// let pdfParse;
// try {
//   // Try the ES6 import first
//   const pdfModule = await import('pdf-parse');
//   pdfParse = pdfModule.default;
// } catch (error) {
//   try {
//     // Fallback to require
//     const { createRequire } = await import('module');
//     const require = createRequire(import.meta.url);
//     pdfParse = require('pdf-parse');
//   } catch (requireError) {
//     console.error('Could not import pdf-parse:', requireError);
//   }
// }

// // --- Utility functions for parsing ---
// // const extractCost = (text) => {
// //   try {
// //     // Enhanced regex to catch more cost patterns
// //     const costPatterns = [
// //   /[\$€£₹]\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g, // Match $, €, £, ₹ followed by numbers
// //   /(?:cost|price|total|amount)[\s:]*[\$€£₹]?(\d+(?:,\d{3})*(?:\.\d{2})?)/gi,
// //   /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:dollars?|usd|eur|inr|pounds?|rs|₹|\$|€|£)/gi
// // ];
    
// //     let maxCost = 0;
    
// //     for (const pattern of costPatterns) {
// //       const matches = text.matchAll(pattern);
// //       for (const match of matches) {
// //         const cost = parseFloat(match[1].replace(/,/g, ""));
// //         if (cost > maxCost) {
// //           maxCost = cost;
// //         }
// //       }
// //     }
    
// //     return maxCost;
// //   } catch (error) {
// //     console.warn('Error extracting cost:', error);
// //     return 0;
// //   }
// // };

// const extractCost = (text) => {
//   try {
//     // Replace common mis-encoded currency symbols
//     text = text
//       .replace(/â‚¹/g, "₹")
//       .replace(/â‚¬/g, "€")
//       .replace(/Â£/g, "£")
//       .replace(/\u00A0/g, " ");

//     const costPatterns = [
//       /[\$€£₹]\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g,
//       /(?:cost|price|total|amount)[\s:]*[\$€£₹]?(\d+(?:,\d{3})*(?:\.\d{2})?)/gi,
//       /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:dollars?|usd|eur|inr|pounds?|rs|₹|\$|€|£)/gi
//     ];
    
//     let maxCost = 0;
//     for (const pattern of costPatterns) {
//       const matches = text.matchAll(pattern);
//       for (const match of matches) {
//         const cost = parseFloat(match[1].replace(/,/g, ""));
//         if (cost > maxCost) {
//           maxCost = cost;
//         }
//       }
//     }
//     return maxCost;
//   } catch (error) {
//     console.warn("Error extracting cost:", error);
//     return 0;
//   }
// };


// const extractDuration = (text) => {
//   try {
//     // Enhanced regex to catch more duration patterns
//     const durationPatterns = [
//       /(\d+)\s*(?:days?|d)/gi,
//       /(\d+)\s*(?:nights?|n)/gi,
//       /(\d+)\s*(?:hours?|hrs?|h)/gi,
//       /duration[\s:]*(\d+)/gi,
//       /(\d+)\s*(?:day|night)/gi
//     ];
    
//     let maxDuration = 0;
    
//     for (const pattern of durationPatterns) {
//       const matches = text.matchAll(pattern);
//       for (const match of matches) {
//         const duration = parseInt(match[1]);
//         if (duration > maxDuration) {
//           maxDuration = duration;
//         }
//       }
//     }
    
//     return maxDuration;
//   } catch (error) {
//     console.warn('Error extracting duration:', error);
//     return 0;
//   }
// };

// // Update the extractActivities function to handle undefined/null text
// const extractActivities = (text) => {
//   try {
//     // Add null/undefined check
//     if (!text || typeof text !== 'string') {
//       console.warn('extractActivities received invalid text:', typeof text);
//       return [];
//     }

//     const lines = text.split("\n")
//       .map(l => l.trim())
//       .filter(l => l && l.length > 5) // Added l check
//       .filter(l => !l.match(/^[\d\s\-\.]+$/))
//       .filter(l => l.length < 200)
//       .slice(0, 15);
    
//     const activityKeywords = [
//       'visit', 'tour', 'explore', 'experience', 'activity', 'excursion',
//       'sightseeing', 'museum', 'temple', 'beach', 'island', 'park',
//       'restaurant', 'dining', 'shopping', 'adventure', 'cruise'
//     ];
    
//     const activities = lines.filter(line => {
//       const lowerLine = line.toLowerCase();
//       return activityKeywords.some(keyword => lowerLine.includes(keyword));
//     });
    
//     return activities.length > 0 ? activities.slice(0, 10) : lines.slice(0, 5);
//   } catch (error) {
//     console.warn('Error extracting activities:', error);
//     return [];
//   }
// };

// // Update the extractCost and extractDuration functions similarly
// const extractCost = (text) => {
//   try {
//     if (!text || typeof text !== 'string') {
//       console.warn('extractCost received invalid text:', typeof text);
//       return 0;
//     }
//     // ... rest of your existing logic
//   } catch (error) {
//     console.warn("Error extracting cost:", error);
//     return 0;
//   }
// };

// const extractDuration = (text) => {
//   try {
//     if (!text || typeof text !== 'string') {
//       console.warn('extractDuration received invalid text:', typeof text);
//       return 0;
//     }
//     // ... rest of your existing logic
//   } catch (error) {
//     console.warn('Error extracting duration:', error);
//     return 0;
//   }
// };

// // --- Function to parse different file types ---
// const parseFile = async (filePath) => {
//   try {
//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File not found: ${filePath}`);
//     }

//     const fileExtension = path.extname(filePath).toLowerCase();
//     console.log(`Parsing file with extension: ${fileExtension}`);
    
//     if (fileExtension === '.pdf') {
//       if (!pdfParse) {
//         throw new Error('PDF parsing library not available');
//       }
      
//       const dataBuffer = fs.readFileSync(filePath);
//       console.log(`PDF file size: ${dataBuffer.length} bytes`);
      
//       const pdfData = await pdfParse(dataBuffer);
//       console.log(`Extracted text length: ${pdfData.text.length} characters`);
      
//       if (!pdfData.text || pdfData.text.trim().length === 0) {
//         throw new Error('No text content found in PDF');
//       }
      
//       return pdfData.text;
//     } 
//     else if (fileExtension === '.json') {
//       const jsonData = fs.readFileSync(filePath, 'utf8');
//       const parsedData = JSON.parse(jsonData);
      
//       // Handle different JSON structures
//       if (parsedData.itinerary) {
//         return JSON.stringify(parsedData.itinerary, null, 2);
//       } else if (parsedData.activities || parsedData.description || parsedData.content) {
//         return JSON.stringify(parsedData, null, 2);
//       } else if (typeof parsedData === 'object') {
//         return JSON.stringify(parsedData, null, 2);
//       }
//       return parsedData.toString();
//     }
//     else {
//       throw new Error(`Unsupported file type: ${fileExtension}. Only PDF and JSON files are supported.`);
//     }
//   } catch (error) {
//     console.error(`Error parsing file ${filePath}:`, error);
//     throw new Error(`Error parsing file: ${error.message}`);
//   }
// };

// // --- Upload Controller ---
// export const uploadItinerary = async (req, res) => {
//   let uploadedFile = null;
  
//   try {
//     console.log('Request body:', req.body);
//     console.log('Request file:', req.file);
//     console.log('Request files:', req.files);

//     // Handle both single file and files array (for upload.any())
//     uploadedFile = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    
//     if (!uploadedFile) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "No file uploaded. Please select a PDF or JSON file." 
//       });
//     }

//     // Validate file size (50MB limit)
//     if (uploadedFile.size > 50 * 1024 * 1024) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "File too large. Maximum size is 50MB." 
//       });
//     }

//     // Check if file exists
//     if (!fs.existsSync(uploadedFile.path)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Uploaded file not found on server" 
//       });
//     }

//     console.log("File uploaded successfully:", uploadedFile.path);
//     console.log("File details:", {
//       name: uploadedFile.originalname,
//       size: uploadedFile.size,
//       mimetype: uploadedFile.mimetype
//     });

//     // Upload to Cloudinary first (before parsing to avoid losing file)
//     const text = await parseFile(uploadedFile.path);

//     let cloudinaryRes = null;
//     try {
//       cloudinaryRes = await fileUpload(uploadedFile.path);
//       console.log("Cloudinary upload successful:", cloudinaryRes?.secure_url);
//     } catch (cloudinaryError) {
//       console.warn("Cloudinary upload failed:", cloudinaryError);
//       // Continue without cloudinary - don't fail the entire operation
//     }

//     // Parse the file content
//     // console.log("Starting file parsing...");
//     // const text = await parseFile(uploadedFile.path);
//     // console.log(`File parsed successfully. Text length: ${text.length}`);

//     // Extract information from the text
//     const totalCost = extractCost(text);
//     const totalDuration = extractDuration(text);
//     const activities = extractActivities(text);

//     console.log("Extracted data:", {
//       totalCost,
//       totalDuration,
//       activitiesCount: activities.length
//     });

//     // Validate postedBy

    
//     if (!req.body.postedBy) {
//       return res.status(400).json({
//         success: false,
//         message: "postedBy field is required"
//       });
//     }

//     const itinerary = new Itinerary({
//       filename: uploadedFile.originalname,
//       cloudinaryUrl: cloudinaryRes?.secure_url || null,
//       totalCost,
//       totalDuration,
//       activitiesCount: activities.length,
//       activities,
//       postedBy: req.body.postedBy,
//       fileType: path.extname(uploadedFile.path).toLowerCase().replace('.', ''),
//       uploadDate: new Date()
//     });

//     await itinerary.save();
//     console.log("Itinerary saved to database:", itinerary._id);

//     // Clean up the uploaded file after processing
//     try {
//       fs.unlinkSync(uploadedFile.path);
//       console.log("Temporary file cleaned up");
//     } catch (cleanupError) {
//       console.warn("Could not delete temporary file:", cleanupError);
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: "File uploaded and processed successfully",
//       itinerary: {
//         id: itinerary._id,
//         filename: itinerary.filename,
//         totalCost: itinerary.totalCost,
//         totalDuration: itinerary.totalDuration,
//         activitiesCount: itinerary.activitiesCount,
//         cloudinaryUrl: itinerary.cloudinaryUrl
//       }
//     });

//   } catch (err) {
//     console.error("Error in uploadItinerary:", err);
    
//     // Clean up file in case of error
//     if (uploadedFile && fs.existsSync(uploadedFile.path)) {
//       try {
//         fs.unlinkSync(uploadedFile.path);
//         console.log("Cleaned up file after error");
//       } catch (cleanupError) {
//         console.warn("Could not delete temporary file after error:", cleanupError);
//       }
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: err.message || "An error occurred while processing the file",
//       error: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }
// };

// // Add this function to your Controllers/Itenary.controller.js file

// // --- Controller for Getting All Itineraries ---
// export const getAllItineraries = async (req, res) => {
//   try {
//     // Fetch all itineraries, sorted by most recent first
//     const itineraries = await Itinerary.find({})
//       .sort({ createdAt: -1, uploadDate: -1 }) // Sort by newest first
//       .limit(50) // Limit to 50 items for performance
//       .select('filename cloudinaryUrl totalCost totalDuration activitiesCount activities postedBy fileType uploadDate createdAt');

//     console.log(`Found ${itineraries.length} itineraries`);

//     // Return the data in the format expected by frontend
//     res.status(200).json({
//       success: true,
//       count: itineraries.length,
//       data: itineraries
//     });

//   } catch (err) {
//     console.error("Error in getAllItineraries:", err);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while fetching itineraries",
//       error: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }
// };

// // --- Controller for Comparing the Files (Pdf, JSON) ---
// export const compareItineraries = async (req, res) => {
//   try {
//     const { ids } = req.query;
    
//     if (!ids) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "No itinerary IDs provided" 
//       });
//     }

//     const idArray = ids.split(",").filter(id => id.trim());
    
//     if (idArray.length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "No valid itinerary IDs provided" 
//       });
//     }

//     const itineraries = await Itinerary.find({ 
//       _id: { $in: idArray } 
//     }).populate("postedBy", "name email");

//     if (itineraries.length === 0) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "No itineraries found with the provided IDs" 
//       });
//     }

//     const scored = itineraries.map((iti) => {
//       let score = 100;
//       let rationale = [];

//       // Scoring logic
//       if (iti.totalCost > 2000) {
//         score -= 20;
//         rationale.push("High cost");
//       } else if (iti.totalCost < 500) {
//         score -= 10;
//         rationale.push("Very low cost - might lack quality");
//       }

//       if (iti.totalDuration < 3) {
//         score -= 15;
//         rationale.push("Too short");
//       } else if (iti.totalDuration > 14) {
//         score -= 10;
//         rationale.push("Very long duration");
//       }

//       if (iti.activitiesCount < 5) {
//         score -= 10;
//         rationale.push("Few activities");
//       } else if (iti.activitiesCount > 20) {
//         score -= 5;
//         rationale.push("Too many activities - might be rushed");
//       }

//       // Bonus points for good balance
//       if (iti.totalCost >= 500 && iti.totalCost <= 2000 && 
//           iti.totalDuration >= 3 && iti.totalDuration <= 10 && 
//           iti.activitiesCount >= 5 && iti.activitiesCount <= 15) {
//         score += 10;
//         rationale.push("Well-balanced itinerary");
//       }

//       return {
//         ...iti.toObject(),
//         score: Math.max(0, Math.min(100, score)), // Ensure score is between 0-100
//         rationale: rationale.length ? rationale.join(", ") : "Standard itinerary"
//       };
//     });

//     // Sort by score descending
//     scored.sort((a, b) => b.score - a.score);

//     res.status(200).json({ 
//       success: true, 
//       count: scored.length,
//       data: scored 
//     });

//   } catch (err) {
//     console.error("Error in compareItineraries:", err);
//     res.status(500).json({ 
//       success: false, 
//       message: "An error occurred while comparing itineraries",
//       error: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }
// };

import fileUpload from "../Utils/fileUpload.js";
import Itinerary from "../Models/Itenary.models.js";
import fs from "fs";
import path from "path";

// Try different pdf-parse import approaches
let pdfParse;
try {
  // Try the ES6 import first
  const pdfModule = await import('pdf-parse');
  pdfParse = pdfModule.default;
} catch (error) {
  try {
    // Fallback to require
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    pdfParse = require('pdf-parse');
  } catch (requireError) {
    console.error('Could not import pdf-parse:', requireError);
  }
}

// --- Utility functions for parsing ---
const extractCost = (text) => {
  try {
    // Add null/undefined check
    if (!text || typeof text !== 'string') {
      console.warn('extractCost received invalid text:', typeof text);
      return 0;
    }

    // Replace common mis-encoded currency symbols
    text = text
      .replace(/â‚¹/g, "₹")
      .replace(/â‚¬/g, "€")
      .replace(/Â£/g, "£")
      .replace(/\u00A0/g, " ");

    const costPatterns = [
      /[\$€£₹]\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g,
      /(?:cost|price|total|amount)[\s:]*[\$€£₹]?(\d+(?:,\d{3})*(?:\.\d{2})?)/gi,
      /(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:dollars?|usd|eur|inr|pounds?|rs|₹|\$|€|£)/gi
    ];
    
    let maxCost = 0;
    for (const pattern of costPatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const cost = parseFloat(match[1].replace(/,/g, ""));
        if (cost > maxCost) {
          maxCost = cost;
        }
      }
    }
    return maxCost;
  } catch (error) {
    console.warn("Error extracting cost:", error);
    return 0;
  }
};

const extractDuration = (text) => {
  try {
    // Add null/undefined check
    if (!text || typeof text !== 'string') {
      console.warn('extractDuration received invalid text:', typeof text);
      return 0;
    }

    // Enhanced regex to catch more duration patterns
    const durationPatterns = [
      /(\d+)\s*(?:days?|d)/gi,
      /(\d+)\s*(?:nights?|n)/gi,
      /(\d+)\s*(?:hours?|hrs?|h)/gi,
      /duration[\s:]*(\d+)/gi,
      /(\d+)\s*(?:day|night)/gi
    ];
    
    let maxDuration = 0;
    
    for (const pattern of durationPatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const duration = parseInt(match[1]);
        if (duration > maxDuration) {
          maxDuration = duration;
        }
      }
    }
    
    return maxDuration;
  } catch (error) {
    console.warn('Error extracting duration:', error);
    return 0;
  }
};

const extractActivities = (text) => {
  try {
    // Add null/undefined check
    if (!text || typeof text !== 'string') {
      console.warn('extractActivities received invalid text:', typeof text);
      return [];
    }

    const lines = text.split("\n")
      .map(l => l.trim())
      .filter(l => l && l.length > 5) // Added l check to prevent undefined
      .filter(l => !l.match(/^[\d\s\-\.]+$/)) // Remove lines with only numbers/dates
      .filter(l => l.length < 200) // Remove very long lines
      .slice(0, 15); // Get more activities
    
    // Look for common activity keywords
    const activityKeywords = [
      'visit', 'tour', 'explore', 'experience', 'activity', 'excursion',
      'sightseeing', 'museum', 'temple', 'beach', 'island', 'park',
      'restaurant', 'dining', 'shopping', 'adventure', 'cruise'
    ];
    
    const activities = lines.filter(line => {
      const lowerLine = line.toLowerCase();
      return activityKeywords.some(keyword => lowerLine.includes(keyword));
    });
    
    return activities.length > 0 ? activities.slice(0, 10) : lines.slice(0, 5);
  } catch (error) {
    console.warn('Error extracting activities:', error);
    return [];
  }
};

// --- Function to parse different file types ---
const parseFile = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileExtension = path.extname(filePath).toLowerCase();
    console.log(`Parsing file with extension: ${fileExtension}`);
    
    if (fileExtension === '.pdf') {
      if (!pdfParse) {
        throw new Error('PDF parsing library not available');
      }
      
      const dataBuffer = fs.readFileSync(filePath);
      console.log(`PDF file size: ${dataBuffer.length} bytes`);
      
      const pdfData = await pdfParse(dataBuffer);
      console.log(`Extracted text length: ${pdfData.text ? pdfData.text.length : 0} characters`);
      
      if (!pdfData.text || pdfData.text.trim().length === 0) {
        console.warn('No text content found in PDF');
        return ''; // Return empty string instead of throwing error
      }
      
      return pdfData.text;
    } 
    else if (fileExtension === '.json') {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(jsonData);
      
      // Handle different JSON structures
      if (parsedData.itinerary) {
        return JSON.stringify(parsedData.itinerary, null, 2);
      } else if (parsedData.activities || parsedData.description || parsedData.content) {
        return JSON.stringify(parsedData, null, 2);
      } else if (typeof parsedData === 'object') {
        return JSON.stringify(parsedData, null, 2);
      }
      return parsedData.toString();
    }
    else {
      throw new Error(`Unsupported file type: ${fileExtension}. Only PDF and JSON files are supported.`);
    }
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    throw new Error(`Error parsing file: ${error.message}`);
  }
};

// --- Upload Controller ---
export const uploadItinerary = async (req, res) => {
  let uploadedFile = null;
  
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request files:', req.files);

    // Handle both single file and files array (for upload.any())
    uploadedFile = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    
    if (!uploadedFile) {
      return res.status(400).json({ 
        success: false, 
        message: "No file uploaded. Please select a PDF or JSON file." 
      });
    }

    // Validate file size (50MB limit)
    if (uploadedFile.size > 50 * 1024 * 1024) {
      return res.status(400).json({ 
        success: false, 
        message: "File too large. Maximum size is 50MB." 
      });
    }

    // Check if file exists
    if (!fs.existsSync(uploadedFile.path)) {
      return res.status(400).json({ 
        success: false, 
        message: "Uploaded file not found on server" 
      });
    }

    console.log("File uploaded successfully:", uploadedFile.path);
    console.log("File details:", {
      name: uploadedFile.originalname,
      size: uploadedFile.size,
      mimetype: uploadedFile.mimetype,
      path: uploadedFile.path
    });

    // Parse the file content FIRST
    console.log("Starting file parsing...");
    let text = '';
    try {
      text = await parseFile(uploadedFile.path);
      console.log(`File parsed successfully. Text length: ${text ? text.length : 0}`);
    } catch (parseError) {
      console.error('File parsing failed:', parseError);
      text = ''; // Set to empty string if parsing fails
    }

    // Upload to Cloudinary AFTER successful parsing (optional)
    let cloudinaryRes = null;
    try {
      cloudinaryRes = await fileUpload(uploadedFile.path);
      console.log("Cloudinary upload successful:", cloudinaryRes?.secure_url);
    } catch (cloudinaryError) {
      console.warn("Cloudinary upload failed:", cloudinaryError);
      // Continue without cloudinary - don't fail the entire operation
    }

    // Extract information from the text (now with proper error handling)
    const totalCost = extractCost(text);
    const totalDuration = extractDuration(text);
    const activities = extractActivities(text);

    console.log("Extracted data:", {
      totalCost,
      totalDuration,
      activitiesCount: activities.length,
      textLength: text ? text.length : 0
    });

    // Validate postedBy
    if (!req.body.postedBy) {
      return res.status(400).json({
        success: false,
        message: "postedBy field is required"
      });
    }

    const itinerary = new Itinerary({
      filename: uploadedFile.originalname,
      cloudinaryUrl: cloudinaryRes?.secure_url || null,
      totalCost,
      totalDuration,
      activitiesCount: activities.length,
      activities,
      postedBy: req.body.postedBy,
      fileType: path.extname(uploadedFile.path).toLowerCase().replace('.', ''),
      uploadDate: new Date()
    });

    await itinerary.save();
    console.log("Itinerary saved to database:", itinerary._id);

    // Clean up the uploaded file after processing
    try {
      fs.unlinkSync(uploadedFile.path);
      console.log("Temporary file cleaned up");
    } catch (cleanupError) {
      console.warn("Could not delete temporary file:", cleanupError);
    }

    res.status(200).json({ 
      success: true, 
      message: "File uploaded and processed successfully",
      data: {
        id: itinerary._id,
        filename: itinerary.filename,
        totalCost: itinerary.totalCost,
        totalDuration: itinerary.totalDuration,
        activitiesCount: itinerary.activitiesCount,
        activities: itinerary.activities,
        postedBy: itinerary.postedBy,
        fileType: itinerary.fileType,
        cloudinaryUrl: itinerary.cloudinaryUrl,
        uploadDate: itinerary.uploadDate
      }
    });

  } catch (err) {
    console.error("Error in uploadItinerary:", err);
    
    // Clean up file in case of error
    if (uploadedFile && uploadedFile.path && fs.existsSync(uploadedFile.path)) {
      try {
        fs.unlinkSync(uploadedFile.path);
        console.log("Cleaned up file after error");
      } catch (cleanupError) {
        console.warn("Could not delete temporary file after error:", cleanupError);
      }
    }
    
    res.status(500).json({ 
      success: false, 
      message: err.message || "An error occurred while processing the file",
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// --- Controller for Getting All Itineraries ---
export const getAllItineraries = async (req, res) => {
  try {
    // Fetch all itineraries, sorted by most recent first
    const itineraries = await Itinerary.find({})
      .sort({ createdAt: -1, uploadDate: -1 }) // Sort by newest first
      .limit(50) // Limit to 50 items for performance
      .select('filename cloudinaryUrl totalCost totalDuration activitiesCount activities postedBy fileType uploadDate createdAt');

    console.log(`Found ${itineraries.length} itineraries`);

    // Return the data in the format expected by frontend
    res.status(200).json({
      success: true,
      count: itineraries.length,
      data: itineraries
    });

  } catch (err) {
    console.error("Error in getAllItineraries:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching itineraries",
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// --- Controller for Comparing the Files (Pdf, JSON) ---
export const compareItineraries = async (req, res) => {
  try {
    const { ids } = req.query;
    
    if (!ids) {
      return res.status(400).json({ 
        success: false, 
        message: "No itinerary IDs provided" 
      });
    }

    const idArray = ids.split(",").filter(id => id.trim());
    
    if (idArray.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "No valid itinerary IDs provided" 
      });
    }

    const itineraries = await Itinerary.find({ 
      _id: { $in: idArray } 
    }).populate("postedBy", "name email");

    if (itineraries.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No itineraries found with the provided IDs" 
      });
    }

    const scored = itineraries.map((iti) => {
      let score = 100;
      let rationale = [];

      // Scoring logic
      if (iti.totalCost > 2000) {
        score -= 20;
        rationale.push("High cost");
      } else if (iti.totalCost < 500) {
        score -= 10;
        rationale.push("Very low cost - might lack quality");
      }

      if (iti.totalDuration < 3) {
        score -= 15;
        rationale.push("Too short");
      } else if (iti.totalDuration > 14) {
        score -= 10;
        rationale.push("Very long duration");
      }

      if (iti.activitiesCount < 5) {
        score -= 10;
        rationale.push("Few activities");
      } else if (iti.activitiesCount > 20) {
        score -= 5;
        rationale.push("Too many activities - might be rushed");
      }

      // Bonus points for good balance
      if (iti.totalCost >= 500 && iti.totalCost <= 2000 && 
          iti.totalDuration >= 3 && iti.totalDuration <= 10 && 
          iti.activitiesCount >= 5 && iti.activitiesCount <= 15) {
        score += 10;
        rationale.push("Well-balanced itinerary");
      }

      return {
        ...iti.toObject(),
        score: Math.max(0, Math.min(100, score)), // Ensure score is between 0-100
        rationale: rationale.length ? rationale.join(", ") : "Standard itinerary"
      };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    res.status(200).json({ 
      success: true, 
      count: scored.length,
      data: scored 
    });

  } catch (err) {
    console.error("Error in compareItineraries:", err);
    res.status(500).json({ 
      success: false, 
      message: "An error occurred while comparing itineraries",
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};