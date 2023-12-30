import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Temperature } from '../modal/temperature';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  data: BehaviorSubject<Temperature> = new BehaviorSubject<Temperature>({});

  // set data to observable
  setData(data: Temperature): boolean{
    this.data.next(data);
    return true;
  }

  // get the data from the observable variable
  getData(): Observable<Temperature>{
    return this.data;
  }

}
