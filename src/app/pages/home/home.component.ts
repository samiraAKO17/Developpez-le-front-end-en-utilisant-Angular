import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { Pays } from 'src/app/core/models/Pays';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { participation } from 'src/app/core/models/Participation';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$= new Observable<Olympic []> ;
  olympics= new Array<Olympic>;
  view: [number, number] = [700, 400];
  chartData: { name: string; value: number }[] = [];
  nb_jos!: number;  
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
     



  constructor(private olympicService: OlympicService, private router: Router) {
   
  }

  ngOnInit(): void {

    this.olympicService.getOlympics().subscribe((data)=>this.olympics$ =data);
    
    this.olympicService.getCountries().subscribe((data) => {
      this.chartData = data.map((d) => ({ name: d.country, value: d.totalMedals }));
      //console.log('Chart Data:', this.chartData);
    });
    
    // this.olympicService.getTotalJos().subscribe((data)=>{
    //   console.log(data);
      
    //   //this.olympics=data
    // });

  }

 
  onSelect(data : any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data  : any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data  : any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  onDlClik(data  : any){
   // this.router.navigate(['/modifier-admin', user_id]);
    let name = JSON.parse(JSON.stringify(data)).data.name;
    this.router.navigate(['/details',1]);

}
}