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
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ =new BehaviorSubject<Olympic[] > ([]);
  constructor(private http: HttpClient) {
  }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
     return this.olympics$.asObservable();
  }
  
    // Obtenir les données d'un pays spécifique (par id)
  getCountry(id:number ): Observable<{ name: string; series: { name: string; value: number }[] } > {
    return this.getOlympics().pipe(
      map((olympics) => {       
        const country = olympics?.find((o:Olympic) => o.id == id);
        if (!country) throw new Error(`Country with ID ${id} not found`);
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
  
  getTotalJos(): Observable< {totalJos: number} > {
    return this.getOlympics().pipe(
      map((olympics) => ({
        totalJos: olympics.reduce((sum, o) => sum + o.participations.length, 0),
      }))
    );
                
  }
  getNbCountry(): Observable< {total: number} > {
    return this.getOlympics().pipe(
      map(
        (olympics) => {
         
          return {
                   
                    total: olympics.reduce((sum:number, o:Olympic) => sum + 1, 0)
                  }
  }));
                
  }
    // Obtenir l'ID d'un pays à partir de son nom
  getCountryId(name:string): Observable< {id: number} > {
    return this.getOlympics().pipe(
      map(
        (olympics) => {
          const country = olympics.find((o:Olympic) => o.country === name);
          if (!country) throw new Error(`Country with name ${name} not found`);
          return {
                  id: country.id
                  }
  }));
                
  }

    // Obtenir le nom d'un pays à partir de son ID
  getCountryNameById(id:number): Observable< {name: string} > {
    return this.getOlympics().pipe(
      map(
        (olympics) => {
          const country = olympics.find((o:Olympic) => o.id == id);
          if (!country) throw new Error(`Country with ID ${id} not found`);
          return {
                  name: country.country
                  }
  }));
                
  }
  // Obtenir tous les pays et leur nombre total de médailles
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

  // Obtenir le nombre total de médailles pour un pays donné
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
    // Obtenir le nombre total d'athletes pour un pays donné
  getTotalAtheletics(id:number): Observable< {totalAthletics: number} > {
    return this.getOlympics().pipe(
      map(
        (olympics) => {
          const country = olympics.find((o:Olympic) => o.id == id);
          if (!country) throw new Error(`Country with ID ${id} not found`);
          return {
                   
            totalAthletics: country.participations.reduce((sum:number, p:participation) => sum + p.athleteCount, 0),
                  }
  }));
                
  }
    // Obtenir les données d'un pays spécifique (par nom)
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
