import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Pays } from '../models/Pays';
import { Olympic } from '../models/Olympic';
import { participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  [x: string]: any;
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ =new BehaviorSubject<Olympic[] | any> (undefined);
  pays : Pays []=  [] ;
  constructor(private http: HttpClient) {
    // this.olympics$;
  }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
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
    //this.getPays();
    return this.olympics$.asObservable();
    
  }
  
  
  getCountry(id:number ): Observable<{ name: string; series: { name: string; value: number }[] } | any> {
    return this.getOlympics().pipe(
      map((olympics) => {
       // console.log("get country O.S:" + olympics);
        let country: Olympic |null=null; 
        if(olympics){
          //console.log("id_country in O.S :"+id);
          
         country = olympics?.find((o:Olympic) => o.id == id);
        if (!country) throw new Error(`Country with ID ${id} not found`);}
        return {
          name: country?.country,
          series: country?.participations.map((p :participation) => ({
            name: p.year.toString(), 
            value: p.medalsCount,   
          })),
        };
      })
    );
  }
  getTotalJos(): Observable< {totalJos: number} > {
    return this.getOlympics().pipe(
      map(
        (olympics) => {
          const country = olympics.find((o:Olympic) => o.country === "France");
          if (!country) throw new Error(`Country with ID ${"Italy"} not found`);
          return {
                   
                    totalJos: country.participations.reduce((sum:number, p:participation) => sum + 1, 0),
                  }
  }));
                
  }
  getCountries(): Observable<{ country: string; totalMedals: number }[]> {
    return this.getOlympics().pipe(
      map((olympics) =>
        (olympics || []).map((o:Olympic) => ({
          country: o.country,
          totalMedals: o.participations.reduce((sum, p) => sum + p.medalsCount, 0),
        }))
      )
    );
  }
  
  getTotalMedals(id:number): Observable< {totalMedals: number} > {
    return this.getOlympics().pipe(
      map(
        (olympics) => {
          const country = olympics.find((o:Olympic) => o.id == id);
          if (!country) throw new Error(`Country with ID ${id} not found`);
          return {
                   
                    totalMedals: country.participations.reduce((sum:number, p:participation) => sum + p.medalsCount, 0),
                  }
  }));
                
  }
  getTotalAtheletics(id:number): Observable< {totalAthletics: number} > {
    return this.getOlympics().pipe(
      map(
        (olympics) => {
          const country = olympics.find((o:Olympic) => o.id === id);
          if (!country) throw new Error(`Country with ID ${id} not found`);
          return {
                   
            totalAthletics: country.participations.reduce((sum:number, p:participation) => sum + p.athleteCount, 0),
                  }
  }));
                
  }
  getCountryByName(name: string): Observable<{ name: string; series: { name: string; value: number }[] }> {
    return this.getOlympics().pipe(
      map((olympics) => {
        const country = olympics.find((o:Olympic) => o.country === name);
        if (!country) throw new Error(`Country with ID ${name} not found`);
        return {
          name: country.country,
          series: country.participations.map((p :participation) => ({
            name: p.year.toString(), 
            value: p.medalsCount,   
          })),
        };
      })
    );
  }
  
  
}
