const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fabricSchema = new Schema ({
  type:         { type: String, default: "fabric"},
  name:         { type: String, required: [true, 'Enter a fabric name']},
  description:  { type: String, required: false},
  length:       { type: Number, required: [true, 'Add the length of the fabric']},
  width:        { type: Number, required: [true, 'Add the width of the fabric']},
  imageUrl:     { type: String, default: "/images/def-fabric.png"},
  material:     String,
  color:        String,
  pattern:      Boolean,
  owner:        { type: Schema.Types.ObjectId, ref: 'User'}
  },{
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    });

const Fabric = mongoose.model("Fabric", fabricSchema);

module.exports = Fabric;