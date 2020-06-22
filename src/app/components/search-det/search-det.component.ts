import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SearchService } from '../../services/search.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-search-det',
  templateUrl: './search-det.component.html',
  styleUrls: ['./search-det.component.css']
})
export class SearchDetComponent implements OnInit {
  Username: string;
  TextSearch: string;
  showCount: number = 0;
  filter1 = { ETKT: true, Genres: true, ACI: true, Sev_1: true, Sev_2: true, Sev_3: true, Sev_4: true, Sev_5: true };
  onData: any[];
  filterdata: any[];
  filterdata2: any[];
  filterdata3: any[];
  splicedData: any;
  pageLength: any;
  pageSize: number = 10;

  constructor(private SearchSer: SearchService,
    public route: ActivatedRoute,
    public router: Router,
    private changeDetectorRef: ChangeDetectorRef) {
    if (localStorage.currentUser == undefined) {
      this.router.navigate(['/']);
    }

    if (this.SearchSer.searchStr) {
      this.TextSearch = this.SearchSer.searchStr;
      this.onEnter();
    }
  }

  ngOnInit(): void {
    this.Username = localStorage.currentUser;
    this.onEnter();
  }

  onEnter() {
    this.SearchSer.SearchDetails(this.TextSearch).subscribe(
      (data: any) => {
        this.getData(data);
        this.onData = data;
        this.filterdata = data;
        this.setPageData();
      }
    );
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.filterdata.slice(offset, offset + event.pageSize);
  }

  DisplayAll() {
    this.TextSearch = " display all records";
    this.SearchSer.searchAll().subscribe(
      (data: any) => {
        this.getData(data);
        this.onData = data;
        this.filterdata = data;
        this.filterdata = _.sortBy(this.filterdata, (o: { LastModifiedDate: any; }) => o.LastModifiedDate);
        this.filterdata.reverse();
        this.setPageData();
      }
    );
  }

  BacktoSearch() {
    this.router.navigate(['/search']);
  }

  editSearch(data: any) {
    this.SearchSer.EditSearchData = data;
    this.SearchSer.searchStr = this.TextSearch;
    this.router.navigate(['/update']);

  }

  addData() {
    this.router.navigate(['/Add']);
  }

  filterchange() {
    this.filterdata = this.onData.filter(x =>
      (x.Team === "TKT" && this.filter1.ETKT) ||
      (x.Team === "RES" && this.filter1.Genres) ||
      (x.Team === "ACI" && this.filter1.ACI));
    this.filterdata = _.sortBy(this.filterdata, (o: { Team: any; }) => o.Team)
    this.setPageData();
  }

  filterchange1() {
    this.filterdata = this.onData.filter(x =>
      (x.Severity === 1 && this.filter1.Sev_1) ||
      (x.Severity === 2 && this.filter1.Sev_2) ||
      (x.Severity === 3 && this.filter1.Sev_3) ||
      (x.Severity === 4 && this.filter1.Sev_4) ||
      (x.Severity === 5 && this.filter1.Sev_5));
    this.filterdata = _.sortBy(this.filterdata, (o: { Severity: any; }) => o.Severity)
    this.setPageData();
  }

  filterchange2() {
    this.filterdata2.forEach(el1 => {
      this.onData.forEach(el2 => {
        if (el2.IA == el1.IA) {
          el2.checked = el1.checked;
        }
      });
    });
    this.filterdata = this.onData.filter(y =>
      (y.checked === true))
    this.filterdata = _.sortBy(this.filterdata, (o: { IA: any; }) => o.IA)

    this.setPageData();
  }

  filterchange3() {
    this.filterdata3.forEach(el1 => {
      this.onData.forEach(el2 => {
        if (el2.ReportedBy == el1.ReportedBy) {
          el2.checked = el1.checked;
        }
      });
    });
    this.filterdata = this.onData.filter(y =>
      (y.checked === true))
    this.filterdata = _.sortBy(this.filterdata, (o: { ReportedBy: any; }) => o.ReportedBy)

    this.setPageData();
  }

  getData(data: any[]) {
    data.forEach(function (item) { item.checked = false; });
    this.filterdata2 = [];
    data.forEach(element => {
      this.filterdata2.push({ IA: element.IA, checked: element.checked });
    });

    this.filterdata2 = this.filterdata2.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.IA === item.IA
      ))
    )

    this.filterdata3 = [];
    data.forEach(element => {
      this.filterdata3.push({ ReportedBy: element.ReportedBy, checked: element.checked });
    });

    this.filterdata3 = this.filterdata3.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.ReportedBy === item.ReportedBy
      ))
    )
    this.showCount = data.length;
  }

  setPageData() {
    this.showCount = this.filterdata.length;
    this.pageLength = this.filterdata.length;
    this.splicedData = this.filterdata.slice(0, this.pageSize);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
