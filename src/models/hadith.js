import mongoose from 'mongoose';

const hadithSchema = new mongoose.Schema(
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
    isnadAr: {
      type: String
    },
  },
  {
    timestamps: true,
  },
);

hadithSchema.pre('remove', function(next) {
  this.model('Comment').deleteMany({ hadithId: this._id }, next);
});

const Hadith = mongoose.model('Hadith', hadithSchema);

export default Hadith;
