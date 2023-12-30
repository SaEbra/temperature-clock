import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadComponent: () => 
      import('./pages/entries/entries.component')
          .then(m => m.EntriesComponent),
  },
  {
    path: "temperature",
    loadComponent: () => 
      import('./pages/temperature-clock/temperature-clock.component')
          .then(m => m.TemperatureClockComponent),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
