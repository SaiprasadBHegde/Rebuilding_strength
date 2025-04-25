import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { BlogPageComponent } from './blog-page/blog-page.component';

export const routes: Routes = [ { path: '', component: HomeComponent, pathMatch: 'full' },{ path: 'exercises', component: ExercisesComponent, pathMatch: 'full' },{ path: 'blogs', component: BlogPageComponent, pathMatch: 'full' }];
