import { Component, HostListener, OnInit } from '@angular/core';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Pays } from 'src/app/core/models/Pays';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { filter, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AUTO_STYLE } from '@angular/animations';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgxChartsModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  
  public olympics$: Observable<Olympic[]> = new Observable<Olympic[]>();
  totalMedals!: number;
  country!: string;
  totalAthletics!: number;
  id_country!: number;
  view: [number, number] = [700, 400];

  //linechartadat;
  linechartData: { name: string; series: { name: string; value: number }[] }[] = [];


  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Medals';
  timeline: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };
  private destroy$ = new Subject<void>();


  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) {
    this.ngOnInit();
    if(window.innerWidth<700)
    this.view = [window.innerWidth / 1.05, 400];
   }



  ngOnInit(): void {
    this.id_country = this.route.snapshot.params['id'];
    console.log(this.id_country);


    this.olympicService.getOlympics()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data =>
        this.olympics$ = new Observable<Olympic[]>(observer => observer.next(data))
      );


    this.olympicService.getCountry(this.id_country)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.linechartData.push(data);
      });

    this.olympicService.getTotalMedals(this.id_country)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.totalMedals = data.totalMedals;
      })

    this.olympicService.getTotalAtheletics(this.id_country)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.totalAthletics = data.totalAthletics;
      })
    this.olympicService.getCountryNameById(this.id_country)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.country = data.name;
      })


  }

  onSelect(data: { name: string; value: number }): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: { name: string; value: number }): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: { name: string; value: number }): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.05, 400];
  }


  ngOnDestroy(): void {
    // Émettre un signal pour se désinscrire
    this.destroy$.next();
    this.destroy$.complete();
  }

}
