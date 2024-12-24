import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pays } from 'src/app/core/models/Pays';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics$: Observable<any> = of(null);
  pays!:Pays[] | any;
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private olympicService: OlympicService) {
    
    Object.assign(this, { Pays });

  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(data=>{
      
          this.pays = data;
    
    });

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
}
