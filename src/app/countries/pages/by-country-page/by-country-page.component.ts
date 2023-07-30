import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {

  public countries:Country[] = []
  public isLoading : boolean = false
  public initialValue : string = ''

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries
    this.initialValue = this.countriesService.cacheStore.byCountries.term
  }

  searchByCountry(term:string){
    this.isLoading=true
    this.countriesService.seachCountry(term).subscribe(countries=>{
      this.countries = countries
      this.isLoading=false
    })
  }
}
