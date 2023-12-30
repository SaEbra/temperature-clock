import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Temperature } from 'src/app/modal/temperature';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-temperature-clock',
  templateUrl: './temperature-clock.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  styleUrls: ['./temperature-clock.component.scss']
})
export class TemperatureClockComponent implements OnInit {

  data$: Observable<Temperature> = this.storage.getData();
  coolOrWarm: 'cool' | 'warm' = 'cool';
  @ViewChild('arrow') arrow: ElementRef;
  private ngUnsubscribe = new Subject<void>();
  
  constructor(private storage: StorageService, private renderer: Renderer2){}

  ngOnInit(): void {
      this.data$.pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((res: Temperature) =>{
        let total = (res.maxTemp ? res.maxTemp : 0) +  (res.minTemp ? res.minTemp: 0);
        let half = total / 2;
        if(res.targetTemp && half <= res.targetTemp){
          this.coolOrWarm = 'warm'
        }
        if(res.targetTemp){
          let rotate = (res.targetTemp / total ) * 300;
          setTimeout(() => {
            this.arrow.nativeElement.style.transform = 'rotate('+rotate+'deg)';       
          }, 100);
        }

      });
  }
   
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
