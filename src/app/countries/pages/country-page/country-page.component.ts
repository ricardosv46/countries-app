import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  public country?:Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router : Router
    ){}

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(({id})=>{
  //     this.countriesService.seachCountryByAlphaCode(id).subscribe(country=>{
  //     console.log({country});
  //     this.country = country
  //   })
  // }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id})=>this.countriesService.seachCountryByAlphaCode(id))
    ).subscribe((country)=>{
      if(!country) return this.router.navigateByUrl('')
    
       return this.country = country
    })
  }
}