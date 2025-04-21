import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExercisesComponent } from './exercises/exercises.component';

export const routes: Routes = [ { path: '', component: HomeComponent, pathMatch: 'full' },{ path: 'exercises', component: ExercisesComponent, pathMatch: 'full' }];
