import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Pays } from 'src/app/core/models/Pays';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { filter, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
 //@Input() 
 public olympics$: Observable<any> = of(null);
   totalMedals!:number;
   country!: string;
   totalAthletics!: number;
   id_country!: number;

 view: [number, number] = [700, 400];
 
   //linechartadat;
  linechartData: { name: string; series : { name: string; value: number} [] }[]=[];


 // options
 legend: boolean = true;
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
 /**colorScheme = {
   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
 };**/

 constructor(private route: ActivatedRoute ,private olympicService: OlympicService, private router: Router) {
  
   
      // console.log('Chart Data:', this.chartData);
    }
    
   
 
  ngOnInit(): void {
    this.id_country = this.route.snapshot.params['country'];
    console.log(this.id_country);
    

    this.olympicService.getOlympics().subscribe(data=>this.olympics$ =data);

    this.olympicService.getCountry(this.id_country).subscribe((data) => {
      this.linechartData.push(data);      
     });
   
    this.olympicService.getTotalMedals(this.id_country).subscribe((data)=>{
      this.totalMedals=data.totalMedals;
    })

    this.olympicService.getTotalAtheletics(this.id_country).subscribe((data)=>{
      this.totalAthletics=data.totalAthletics;
    })
  }

 

 onSelect(data: any): void {
   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
 }

 onActivate(data: any): void {
   console.log('Activate', JSON.parse(JSON.stringify(data)));
 }

 onDeactivate(data: any): void {
   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
 }

}
