import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { Reader } from 'app/models/reader';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  getAuthorRecommendation(readerId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(readerId > 0) {
          resolve('Dr Seuss');
        } else {
          reject('Invalid reader Id');
        }
      }, 2000);
    })
  }

  constructor(private loggerService: LoggerService,
    private http: HttpClient) { }

  setMostPopularBook(book: Book): void {
    this.mostPopularBook = book;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>('/api/readers')
      .pipe(
        catchError(this.hanleError)
      );
  }

  hanleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.message;
    dataError.friendlyMessage = 'An error occurred retrieving data';
    return throwError(dataError);
  }

  getReaderById(id: number): Reader {
    return allReaders.find(r => r.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(r => r.bookID === id);
  }
}
