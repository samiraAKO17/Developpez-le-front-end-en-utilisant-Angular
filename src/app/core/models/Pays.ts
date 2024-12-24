import { Olympic } from "./Olympic";
import { participation } from "./Participation";

export class Pays implements Olympic {
    id!: number ;
    country!: string;
    participations!: participation[];

    constructor(id:number,country:string,participations:participation[]){

        this.id=id;
        this.country=country;
        this.participations=participations;
    }
}
