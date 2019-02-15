import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Customer, ChequeAsset } from './org.nbd.network';
@Injectable({
  providedIn: 'root'
})
export class DataService<Type> {
  private resolveSuffix = '?resolve=true';
  private actionUrl: string;
  private headers: HttpHeaders;
  public chosenCust;
  public chosenCheque:ChequeAsset;
  constructor(private http: HttpClient) {
    this.actionUrl = '/api/';
    this.headers = new HttpHeaders();
    this.headers.append('Content-any', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll(ns: string): Observable<Type[]> {
    return this.http.get(`${this.actionUrl}${ns}`)
    .pipe(
      map(this.extractData),
      catchError(this.handleError)
    ); 
  }

  public getSingle(ns: string, id: string): Observable<Type> {
    return this.http.get(this.actionUrl + ns + '/' + id + this.resolveSuffix).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public add(ns: string, asset: any): Observable<Type> {
    console.log('Entered DataService add');
    console.log('Add ' + ns);
    console.log('asset', asset);

    return this.http.post(this.actionUrl + ns, asset).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public update(ns: string, id: string, itemToUpdate: any): Observable<any> {
    console.log('Update ' + ns);
    console.log('what is the id?', id);
    console.log('what is the updated item?', itemToUpdate);
    console.log('what is the updated item?', JSON.stringify(itemToUpdate));
    return this.http.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public delete(ns: string, id: string): Observable<any> {
    console.log('Delete ' + ns);

    return this.http.delete(this.actionUrl + ns + '/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<string> {
    throw error;
  }

  private extractData(res: Response): any {
    let body = res;
    return body || {};
  }

  public setChosenCheque(cheque:ChequeAsset){
    this.chosenCheque = cheque;
  }
}
