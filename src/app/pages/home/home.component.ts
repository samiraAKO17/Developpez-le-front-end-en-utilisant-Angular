import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of, Subject } from 'rxjs';
import { Pays } from 'src/app/core/models/Pays';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { participation } from 'src/app/core/models/Participation';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxChartsModule, RouterModule, NgStyle],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$= new Observable<Olympic []> ();
  olympics: Olympic[] = [];
  view: [number, number] = [700, 400];
  chartData: { name: string; value: number }[] = [];
  nb_jos=0;  
  nb_country=0;  
  country_id!:number;
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme: Color = { 
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#C7B48B', '#AAAAAA'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};
    private destroy$ = new Subject<void>();


  constructor(private olympicService: OlympicService, private router: Router) {

  }

  ngOnInit(): void {

    this.olympicService.getOlympics()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>
      this.olympics$ = new Observable<Olympic[]>(observer => observer.next(data))
     );
    
   
    this.olympicService.getCountries()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.chartData = data.map((d) => ({ name: d.country, value: d.totalMedals }));
    });
    
     this.olympicService.getNbCountry()
     .pipe(takeUntil(this.destroy$))
     .subscribe((data)=>{
      this.nb_country=data.total;
    });

     this.olympicService.getTotalJos()
     .pipe(takeUntil(this.destroy$))
     .subscribe((data)=>{
       this.nb_jos=data.totalJos/this.nb_country;
     });

  }
  

  onActivate(data  : { name: string; value: number }): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data  : { name: string; value: number }): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  
  //fonction appeler lors du click sur pays pour renvoyer vers la page details
  onSelect(event:{name:string;  value:number; label:string}){
   // console.log('Données reçues pour onSelect:', event);

    const name = event.name;
    if (!name) {
      console.error('Nom du pays introuvable "name".', event);
      return;
    }
    const countryName = event.name;
    this.olympicService
      .getCountryId(countryName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        const countryId = response.id;
        this.router.navigate(['/details', countryId]);
      });

}

  ngOnDestroy(): void {
      // Émettre un signal pour se désinscrire
      this.destroy$.next();
      this.destroy$.complete();
     // console.log('Component destroyed, unsubscribed');
}
}