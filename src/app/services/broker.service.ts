import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  error: string = '';
  endpoint = environment.development;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  Get<T>(url: string): Observable<T> {

    let options = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const http = this.http.get<T>(this.endpoint + url, { headers: options });

    return http.pipe(
      map((response) => response as T),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  RawGet<T>(url: string): Observable<T> {

    const http = this.http.get<T>(url);

    return http.pipe(
      map((response) => response as T),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  GetDownload<Any>(url: string): Observable<any> {

    let options = new HttpHeaders({
    });

    const http = this.http.get<Any>(this.endpoint + url, { headers: options, observe: 'response', responseType: 'blob' as 'json' });

    return http;
  }

  PostDownload<Any>(url: string, data: any): Observable<any> {

    let options = new HttpHeaders({
    });

    const http = this.http.post<Any>(this.endpoint + url, data, { headers: options, observe: 'response', responseType: 'blob' as 'json' });

    return http;
  }

  Post<T>(url: string, data: any): Observable<T> {

    let options = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const http = this.http.post(this.endpoint + url, data, { headers: options });

    return http.pipe(
      map((response: T) => {
        return response;
      }),
      catchError(err => {
        this.error = "Estamos presentando fallas. Por favor intente más tarde"
        //console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  PostFile<T>(url: string, data: any) {

    let options = new HttpHeaders({
      "Authorization": "Bearer "
    });

    const http = this.http.post(this.endpoint + url, data, { headers: options, reportProgress: true, observe: 'events' });

    return http.pipe(
      map((response: HttpEvent<object> ) => {
        // {token: {token: string}}
        if (response.type === HttpEventType.Response){
          const result = response as HttpResponse<{token: {token: string}}>;
        }
        return response;
      }),
      catchError(err => {
        this.error = "Estamos presentando fallas. Por favor intente más tarde"
        //console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  PostLogin<T>(url: string, data: any) {

    let options = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const http = this.http.post(this.endpoint + url, data, { headers: options });

    return http.pipe(
      map((response) => response as T),
      catchError(err => {
        this.error = "Estamos presentando fallas. Por favor intente más tarde"
        //console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  PostLogOut<T>(url: string, data: any) {

    let options = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const http = this.http.post(this.endpoint + url, data, { headers: options });

    return http.pipe(
      map((response) => response as T),
      catchError(err => {
        this.error = "Estamos presentando fallas. Por favor intente más tarde"
        //console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  PostRaw<T>(url: string, data: any) {

    const http = this.http.post(url, data);

    return http.pipe(
      map((response) => response as T),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }
}
