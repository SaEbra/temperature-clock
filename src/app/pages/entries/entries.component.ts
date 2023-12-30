import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, private router: Router, private storage: StorageService){}

  ngOnInit(): void {
      this.form = this.fb.group({
        maxTemp: [null, Validators.compose([Validators.required])],
        minTemp: [null, Validators.compose([Validators.required])],
        targetTemp: [null, Validators.compose([Validators.required])]
      })
  }

  submit(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    
    let data = this.form.getRawValue();

    // validate the target temperature.
    if(data.targetTemp > data.maxTemp || data.targetTemp < data.minTemp){
      this.message = 'The Target temperature shoud not be more then the maximum temperature and less then the minimum temperature';
      return;
    }

    // store the data in observable
    let setData = this.storage.setData(data);

    if(setData){
      this.router.navigate(['/temperature'])
    }
  }
}
