import { model, Schema } from "mongoose";

export interface ICategory {
  name: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_document, returnedObject) => {
        const categoryObject = returnedObject as Record<string, unknown>;

        categoryObject.id = String(categoryObject._id);

        delete categoryObject._id;

        return categoryObject;
      },
    },
  },
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
