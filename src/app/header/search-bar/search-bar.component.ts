import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    search: [null]
  });

  ngOnInit(): void {
  }

}
