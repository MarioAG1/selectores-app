import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = []
  public borders: string[] = []

  public myForm: FormGroup = this.fb.group({
    region: ["", [Validators.required]],
    country: ["", [Validators.required]],
    border: ["", [Validators.required]]
  })

  constructor(private fb: FormBuilder, private countriesService: CountriesService) {

  }

  ngOnInit(): void {
    this.onRegionChanged(),
      this.onCountryChanged()
  }

  get regions(): Region[] {
    return (this.countriesService.regions)
  }

  onRegionChanged(): void {
    this.myForm.get("region")!.valueChanges
      .pipe(
        tap(() => this.myForm.get("country")!.setValue("")),
        tap(() => this.myForm.get("border")!.setValue("")),
        switchMap(
          region => this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe(countries => {
        this.countriesByRegion = countries
      })
  }

  onCountryChanged(): void {
    this.myForm.get("country")!.valueChanges
      .pipe(
        tap(() => this.borders = []),
        tap(() => this.myForm.get("border")!.setValue("")),
        filter((value: string) =>
          value.length > 0
        ),
        switchMap(
          alphaCode => this.countriesService.getCountriesByAlphaCode(alphaCode)
        )
      )
      .subscribe(country => {
        this.borders = country.borders
      })
  }

}
