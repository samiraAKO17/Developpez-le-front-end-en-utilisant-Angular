import { Olympic } from "./Olympic";
import { participation } from "./Participation";

export class Pays implements Olympic {
   
    id: number;
    country: string;
    participations: participation[];
    medails : number=0;
    athletics: number=0;
    constructor(id: number,
    country: string,
    participations: participation[],
    athletics: number){
        console.log("construct");
        //this.totalMedail=this.medails(this.participations);
        this.id=id;
        this.country=country;
        this.participations=participations;
        this.athletics=athletics;
    }
    
    public tMmedails (parts: participation[]):number{
        let sum=0;
        
        for (let item of parts) {
            console.log(item.medalsCount);
            
            sum+=item.medalsCount;
        }   
        console.log("total medails "+sum);
        
        return sum;
    }

}
