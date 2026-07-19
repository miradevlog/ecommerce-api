import { model, Schema, Types } from "mongoose";

export interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  userId: Types.ObjectId;
  products: IOrderProduct[];
  total: number;
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [orderProductSchema],
      required: true,
      validate: {
        validator: (products: IOrderProduct[]) => products.length > 0,
        message: "An order must contain at least one product",
      },
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_document, returnedObject) => {
        const orderObject = returnedObject as Record<string, unknown>;

        orderObject.id = String(orderObject._id);

        delete orderObject._id;

        return orderObject;
      },
    },
  },
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
