import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    textAr: {
      type: String,
      required: true,
      unique: true,
    },
    textEn: {
      type: String,
    },
    textFr: {
      type: String,
    },
    hadith: { type: mongoose.Schema.Types.ObjectId, ref: 'Hadith' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
