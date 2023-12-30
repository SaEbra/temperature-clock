import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private storage: StorageService, private router: Router){}

  canActivate(){
    // Check if the user has a token
    return this.storage.getData().pipe(
      map(e => {
        if (Object.keys(e).length != 0) {
          return true;
        } else {
          // redirect the user to the login page
          this.router.navigate(['/']);  
          return false;
        }
      }),
      catchError((err) => {
        // In case of error return the user to the login page
        console.log('enter here error')
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
