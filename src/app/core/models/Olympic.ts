// TODO: create here a typescript interface for an olympic country

import { participation } from "./Participation";

/*
example of an olympic country:*/
export interface Olympic
{
    id: number;
    country: string;
    participations: participation[];
}

