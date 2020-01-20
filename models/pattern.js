const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patternSchema = new Schema ({
  type:           { type: String, default: "pattern"},
  name:           { type: String, required: [true, 'Enter a pattern name']},
  description:    { type: String, required: false},
  typeOfClothes:  { type: String, required: [true, 'Select the type of clothes the pattern will create']},
  instructions:   { type: String, required: [true, 'Add necessary steps and information to sew the pattern']},
  imageUrl:       { type: String, default: "/images/def-pattern.png"},
  owner:          { type: Schema.Types.ObjectId, ref: 'User'}
  },{
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    });

const Pattern = mongoose.model("Pattern", patternSchema);

module.exports = Pattern;