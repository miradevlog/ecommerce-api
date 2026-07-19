import { model, Schema, Types } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  categoryId: Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_document, returnedObject) => {
        const productObject = returnedObject as Record<string, unknown>;

        productObject.id = String(productObject._id);

        delete productObject._id;

        return productObject;
      },
    },
  },
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
