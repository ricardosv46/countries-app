import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public countries : Country[] = []
  public isLoading : boolean = false
  public initialValue : string = ''


  constructor(private countriesService: CountriesService){
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries
    this.initialValue = this.countriesService.cacheStore.byCapital.term
  }

  searchByCapital(term:string){
    this.isLoading=true
    this.countriesService.seachCapital(term).subscribe(countries=>{
      this.countries = countries
      this.isLoading = false
    })
  }
}
