const mongoose=require('mongoose');
const autoIncrement=require('mongoose-auto-increment');

const ColorOptionSchema = mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "'product",
    },
    color: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  });
  module.exports = mongoose.model("ColorOptions", ColorOptionSchema);
  