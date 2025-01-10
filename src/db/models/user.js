import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';
import { handleSaveError } from '../../middlewares/handleSaveError.js';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    //   required: true,
    // },
    createdAt: {},
    updatedAt: {},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.post('save', handleSaveError);

const User = model('User', UserSchema);

export default User;
