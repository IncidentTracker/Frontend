import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { AuthServService } from 'src/app/services/auth-serv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  TextSearch: string;
  ShowSearchResult: Boolean = true;
  Username: string;

  constructor(private SearchSer: SearchService,
    private loginSer: AuthServService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    if (localStorage.currentUser == undefined) {
      this.router.navigate(['/']);
    }
    this.Username = localStorage.currentUser;
    this.SearchSer.Username = localStorage.currentUser;
    this.SearchSer.Useremail = localStorage.currentUserEmail;
  }

  onEnter() {
    this.SearchSer.SearchDetails(this.TextSearch).subscribe(
      (data: any) => {
        this.ShowSearchResult = true;
        this.SearchSer.searchStr = this.TextSearch;
        this.router.navigate(['/list']);
      }
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}

