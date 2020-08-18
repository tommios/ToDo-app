import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  body: {
    type: String,
    unique: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.toJSON = function () {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    completed: this.completed,
    created: this.created,
  };
};
export default mongoose.model("Todo", todoSchema);
