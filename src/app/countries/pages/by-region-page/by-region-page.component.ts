import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit{


  public countries:Country[] = []
  public regions:Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectedRegion?:Region
  public isLoading : boolean = false
  
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.countriesService.cacheStore.byRegion.term
  }

  searchByRegion(term:Region){
    this.isLoading=true
    this.selectedRegion = term    
    this.countriesService.seachRegion(term).subscribe(countries=>{
      this.countries = countries
      this.isLoading=false
    })
  }
}
