import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private hackerUrl = "https://hn.algolia.com/api/v1/search";
  private wikiUrl = "https://en.wikipedia.org/w/api.php";
  private subCountUrl = "https://hn.algolia.com/api/v1/users/";
  constructor(private http: HttpClient) { }



  getWikiNews(searchText: string): Observable<[]> {
    // Add safe, URL encoded search parameter if there is a search term
    const options = searchText.trim() ?
      {
        params: new HttpParams().set('search', searchText.trim()).append('action', 'opensearch')
          .append('format', 'json').append('origin', '*')
      } : {};

    return this.http.get<[]>(this.wikiUrl, options);
  }

  getHackerNews(searchText: string, page:string): Observable<[]> {
    // Add safe, URL encoded search parameter if there is a search term
    const options = searchText.trim() ?
      { params: new HttpParams().set('query', searchText.trim()).append('page',page) } : {};

    return this.http.get<[]>(this.hackerUrl, options);
  }

  getSubMissionCount(username: string) {
    return this.http.get<[]>(this.subCountUrl + username);
  }
}
