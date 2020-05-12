import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns: string[] = ['title', 'author', 'count'];
  dataSource = [];

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      source: ['wiki'],
      searchText: ['']
    });
  }

  onSearch() {
    console.log(this.searchForm.value.source);
    let source = this.searchForm.value.source;
    let searcText = this.searchForm.value.searchText;
    if (source === "wiki") {
      this.api.getWikiNews(searcText).subscribe(res => {
        this.dataSource = res;
      });
    } else {
      this.api.getHackerNews(searcText).subscribe(res => {
        this.dataSource = res['hits'];
        this.dataSource.forEach((data, index, theArray) => {
          this.api.getSubMissionCount(data.author).subscribe(res => {
            theArray[index]['count'] = res['submission_count'];
          });
        });
      });
    }


  }


}
