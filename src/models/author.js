import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    shortname: {
      type: String,
      required: true,
      unique: true,
    },
    longname: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

authorSchema.pre('remove', function(next) {
  this.model('Comment').deleteMany({ authorId: this._id }, next);
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
