import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pays } from '../models/Pays';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ : BehaviorSubject<Pays[] | any>= new BehaviorSubject<Pays[] | any>(undefined);
  
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Pays[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  
}
