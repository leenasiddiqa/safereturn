import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  itemId: { 
    type: String, 
    required: true 
  },
  itemName: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String 
  },
  type: { 
    type: String, 
    enum: ["lost", "found", "claim"],
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending" 
  },
  action: { 
    type: String 
  },
  dateReported: { 
    type: Date,
    default: Date.now 
  },
  dateClaimed: { 
    type: Date 
  }
}, {
  timestamps: true
});

export default mongoose.model("History", historySchema);