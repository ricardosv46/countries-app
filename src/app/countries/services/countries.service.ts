import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of ,delay, tap} from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1'

  public cacheStore:CacheStore = {
    byCapital:   { term: '', countries:[] },
    byCountries: { term: '', countries:[] },
    byRegion:    { term: '', countries:[] }

  }

  constructor(private http:HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    
  }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(catchError(()=>of([])))
  }

  seachCountryByAlphaCode(term:string):Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${term}`
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries=> countries.length > 0 ? countries[0] : null),
      catchError(()=>of(null))
      )
  }

  seachCapital(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries=>this.cacheStore.byCapital = {term,countries}),
        tap(()=>this.saveToLocalStorage())
      )
  }

  seachCountry(term:string):Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`
    return this.getCountriesRequest(url).pipe(
      tap(countries=>this.cacheStore.byCountries = {term,countries}),
      tap(()=>this.saveToLocalStorage())
    )
  }

  seachRegion(term:Region):Observable<Country[]>{
    const url = `${this.apiUrl}/region/${term}`
    return this.getCountriesRequest(url).pipe(
      tap(countries=>this.cacheStore.byRegion = {term,countries}),
      tap(()=>this.saveToLocalStorage())
    )
  }
  
}
