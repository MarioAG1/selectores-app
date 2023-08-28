import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[] = [Region.Africa, Region.America, Region.Asia, Region.Europa, Region.Oceania]

  constructor() { }

  get regions(): Region[] {
    return [... this._regions]
  }

  getCountriesByRegion(region: Region): SmallCountry[] {


    return []
  }

}
