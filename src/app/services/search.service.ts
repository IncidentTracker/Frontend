import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OncallDto } from './Oncall_Dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchStr: string;
  Username: string;
  Useremail: string;
  public EditSearchData: any;
  searchdet_withId: any;

  constructor(private http: HttpClient) { }

  //To Display specific records tha tmatches the search keyword
  SearchDetails(SearchText): Observable<OncallDto> {
    return this.http.get("http://18.223.114.221:8000/incident/params", { params: { params: SearchText } }).pipe(
      map(item => {
        return item as OncallDto;
      })
    );
  };

  //To Display all the records
  searchAll(): Observable<OncallDto> {
    return this.http.get("http://18.223.114.221:8000/incident/All").pipe(
      map(item => {
        return item as OncallDto;
      })
    );
  };

  //Add Details
  public AddData(newData): Observable<any> {
    {
      return this.http.post("http://18.223.114.221:8000/incident/insert", { newData });
    }
  }

  //Delete Data from the collection
  public deleteData(objID): Observable<any> {
    return this.http.delete("http://18.223.114.221:8000/incident/delete", { params: { params: objID } });
  }

  //Edit/Update call
  public updateData(ID, editData): Observable<any> {
    {
      return this.http.put("http://18.223.114.221:8000/incident/update", { ID, editData });
    }
  }

}
