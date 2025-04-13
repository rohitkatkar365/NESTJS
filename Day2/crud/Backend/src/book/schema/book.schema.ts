import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  })
  author: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  price: number;

  @Prop({
    type: String,
    enum: ["Fiction", "Non-Fiction", "Science", "History", "Fantasy", "Biography"],
    required: true,
  })
  category: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);