import { Component, OnInit } from '@angular/core';
import { BadgeService } from 'app/core/badge.service';

import { Reader } from "app/models/reader";

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit {

  constructor(private badgeService: BadgeService) { }

  ngOnInit() { }

  saveReader(formValues: any): void {
    let newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    console.log(newReader);
    console.warn('Save new reader not yet implemented.');
  }

}
