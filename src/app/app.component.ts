import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from './api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup;
  displayedColumns: string[] = ['title', 'author', 'count'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      source: ['wiki'],
      searchText: ['']
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator;
  }

  onSearch() {
    console.log(this.searchForm.value.source);
    let source = this.searchForm.value.source;
    let searcText = this.searchForm.value.searchText;
    if (source === "wiki") {
      this.api.getWikiNews(searcText).subscribe(res => {
        this.dataSource.data = res;
      });
    } else {
      this.api.getHackerNews(searcText,this.paginator.pageIndex + 1).subscribe(res => {
        this.dataSource.data = res['hits'];
        this.dataSource.data.forEach((ele, index, theArray) => {
          this.api.getSubMissionCount(ele.author).subscribe(res => {
            theArray[index]['count'] = res['submission_count'];
          });
        });
      });
    }


  }
  pageChanged($event) {
    console.log($event);
  }

}
