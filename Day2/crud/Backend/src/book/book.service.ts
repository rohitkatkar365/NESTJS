import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: mongoose.Model<Book>
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book = await this.bookModel.create(createBookDto);
      return book;
    } catch (error) {
      throw new HttpException(
        `Failed to create book: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookModel.find({});
      return books;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch books: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: string): Promise<Book> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid book ID format', HttpStatus.BAD_REQUEST);
      }
      const book = await this.bookModel.findById(id);
      if (!book) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return book;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch book: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid book ID format', HttpStatus.BAD_REQUEST);
      }
  
      const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
        new: true,
        runValidators: true, // Ensures schema validation on update
      });
  
      if (!updatedBook) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
  
      return updatedBook;
    } catch (error: any) {
      throw new HttpException(
        `Failed to update book: ${error?.message || 'Internal Server Error'}`,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid book ID format', HttpStatus.BAD_REQUEST);
      }
      const result = await this.bookModel.findByIdAndDelete(id);
      if (!result) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Book deleted successfully' };
    } catch (error) {
      throw new HttpException(
        `Failed to delete book: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
