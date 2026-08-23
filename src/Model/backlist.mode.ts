import mongoose, { Schema } from "mongoose";

interface TokenBacklist {
  token: string;
}

const backlistTokenSchema = new Schema<TokenBacklist>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const backlistTokenModel = mongoose.model<TokenBacklist>(
  "tokenBacklist",
  backlistTokenSchema,
);

export default backlistTokenModel;
