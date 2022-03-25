import { Component, OnInit } from '@angular/core';
import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from 'app/core/logger.service';
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private loggerService: LoggerService,
              private dataService: DataService) {
                this.loggerService.log('Creating the dashboard')
       }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    this.dataService.getAllReaders()
      .subscribe(
        (data: Reader[] | BookTrackerError) => this.allReaders = <Reader[]>data,
        (err: BookTrackerError) => console.log(err.friendlyMessage),
        () => this.loggerService.log('All done getting readers')
      );
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.getAuthorRecommendation(1)
      .catch(err => this.loggerService.error(err));

    this.loggerService.log('Done with dashboard OnInit');
  }

  private async getAuthorRecommendation(readerId: number): Promise<void> {
    let author: string = await this.dataService.getAuthorRecommendation(readerId);
    this.loggerService.log(author);
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
