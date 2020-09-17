import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: new Date().toISOString(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

todoSchema.toJSON = function () {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    completed: this.completed,
    created: this.created,
    userId: this.userId,
  };
};

export default mongoose.model("Todo", todoSchema);
