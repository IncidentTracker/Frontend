import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
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
  supervisor: string;
  showCount: number = 0;
  showText: string;
  filter1 = { TKT: false, Genres: false, ACI: false, Sev_1: false, Sev_2: false, Sev_3: false, Sev_4: false, Sev_5: false };
  onData: any[];

  filterdata = [];
  filterdata1 = [];
  filterdata2 = [];
  filterdata3 = [];
  filterdata4 = [];

  dispdata = [];
  dispdata1 = [];
  dispdata2 = [];
  dispdata3 = [];
  dispdata4 = [];

  splicedData: any;
  pageLength: any;
  pageSize: number = 10;
  displaydataNew: any;
  displaydataNew1: any;
  showLoadingIndicator: boolean;

  constructor(private SearchSer: SearchService,
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
    this.showLoadingIndicator = true;
    this.Username = localStorage.currentUser;
    this.supervisor = localStorage.currentUserEmail;
    this.onEnter();
  }

  onEnter() {
    this.showLoadingIndicator = true;
    this.showText = "result(s) were found for the search for";
    this.SearchSer.SearchDetails(this.TextSearch).subscribe(
      (data: any) => {
        this.showLoadingIndicator = false;
        this.getData(data);
        this.onData = data;
        this.filterdata = data;
        this.setPageData();
      }
    );
  }

  DisplayAll() {
    this.showLoadingIndicator = true;
    this.showText = "result(s) were found in total";
    this.TextSearch = "";
    this.SearchSer.searchAll().subscribe(
      (data: any) => {
        this.showLoadingIndicator = false;
        this.getData(data);
        this.onData = data;
        this.filterdata = data;
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
    this.showLoadingIndicator = true;
    this.router.navigate(['/Add']);
  }

  filterchange() {
    this.filterdata = this.onData.filter(x =>
      ((x.Team === "TKT" || x.Team === "ETKT") && this.filter1.TKT) ||
      (x.Team === "RES" && this.filter1.Genres) ||
      (x.Team === "ACI" && this.filter1.ACI));
    this.dispdata = this.filterdata;
    this.getData(this.dispdata);
    this.setCombinationRecords();
    this.getData(this.filterdata);
    this.setPageData();
  }

  filterchange1() {
    this.filterdata = this.onData.filter(x =>
      (x.Severity === 1 && this.filter1.Sev_1) ||
      (x.Severity === 2 && this.filter1.Sev_2) ||
      (x.Severity === 3 && this.filter1.Sev_3) ||
      (x.Severity === 4 && this.filter1.Sev_4) ||
      (x.Severity === 5 && this.filter1.Sev_5));
    this.dispdata1 = this.filterdata;
    this.getData(this.dispdata1);
    this.setCombinationRecords();
    this.getData(this.filterdata);
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
    this.dispdata2 = this.filterdata;
    this.setCombinationRecords();
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
    this.dispdata3 = this.filterdata;
    this.setCombinationRecords();
    this.setPageData();
  }

  filterchange4() {
    this.filterdata4.forEach(ela => {
      this.dispdata.forEach(elb => {
        if (elb.FunctionalArea == ela.FunctionalArea) {
          elb.checked = ela.checked;
        }
      });
    });
    this.filterdata = this.dispdata.filter(y =>
      (y.checked === true))
    this.dispdata4 = this.filterdata;
    this.setCombinationRecords();
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
    this.filterdata2 = _.sortBy(this.filterdata2, (o: { IA: any; }) => o.IA)

    this.filterdata3 = [];
    data.forEach(element => {
      this.filterdata3.push({ ReportedBy: element.ReportedBy, checked: element.checked });
    });
    this.filterdata3 = this.filterdata3.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.ReportedBy === item.ReportedBy
      ))
    )
    this.filterdata3 = _.sortBy(this.filterdata3, (o: { ReportedBy: any; }) => o.ReportedBy)

    this.filterdata4 = [];
    data.forEach(element => {
      this.filterdata4.push({ FunctionalArea: element.FunctionalArea, checked: element.checked });
    });
    this.filterdata4 = this.filterdata4.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.FunctionalArea === item.FunctionalArea
      ))
    )
    this.filterdata4 = _.sortBy(this.filterdata4, (o: { FunctionalArea: any; }) => o.FunctionalArea)
    this.showCount = data.length;
  }

  setPageData() {
    this.showCount = this.filterdata.length;
    this.pageLength = this.filterdata.length;
    this.filterdata = _.sortBy(this.filterdata, (o: { _id: any; }) => o._id);
    this.filterdata = this.filterdata.reverse();
    this.splicedData = this.filterdata.slice(0, this.pageSize);
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.filterdata.slice(offset, offset + event.pageSize);
  }

  setCombinationRecords() {

    this.displaydataNew = [];
    this.displaydataNew1 = [];

    this.displaydataNew = [].concat(this.dispdata, this.dispdata1, this.dispdata2, this.dispdata3, this.dispdata4);
    this.displaydataNew1 = this.displaydataNew.filter(function (element) {
      return element !== undefined;
    });

    this.displaydataNew = this.displaydataNew1.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t._id === item._id
      ))
    )

    if (this.dispdata !== undefined && this.dispdata.length)
      this.getCombinationRecords(this.displaydataNew, this.dispdata);

    if (this.dispdata1 !== undefined && this.dispdata1.length)
      this.getCombinationRecords(this.displaydataNew, this.dispdata1);

    if (this.dispdata2 !== undefined && this.dispdata2.length)
      this.getCombinationRecords(this.displaydataNew, this.dispdata2);

    if (this.dispdata3 !== undefined && this.dispdata3.length)
      this.getCombinationRecords(this.displaydataNew, this.dispdata3);

    if (this.dispdata4 !== undefined && this.dispdata4.length)
      this.getCombinationRecords(this.displaydataNew, this.dispdata4);

    this.filterdata = this.displaydataNew;
  }

  getCombinationRecords(data1: any, data2: any[]) {
    this.displaydataNew = [];
    data1.forEach((element1: any) => {
      data2.forEach((element2: any) => {
        if (element1 === element2) {
          this.displaydataNew.push(element1);
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}