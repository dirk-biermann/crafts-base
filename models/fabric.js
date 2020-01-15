const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fabricSchema = new Schema ({
  name:         { type: String, required: [true, 'Enter a fabric name']},
  description:  { type: String, required: false},
  length:       { type: Number, required: [true, 'Add the length of the fabric']},
  width:        { type: Number, required: [true, 'Add the width of the fabric']},
  imageUrl:     String,
  material:     String,
  color:        String,
  pattern:      Boolean,
  },{
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    });

const Fabric = mongoose.model("Fabric", fabricSchema);

module.exports = Fabric;