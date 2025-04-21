import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Tab {
  id: string;
  name: string;
}

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ExercisesComponent implements OnInit {
  activeTab = 'all';
  
  tabs: Tab[] = [
    { id: 'all', name: 'All Exercises' },
    { id: 'quadriceps', name: 'Quadriceps' },
    { id: 'hamstring', name: 'Hamstring' },
    { id: 'glutes', name: 'Glutes' },
    { id: 'calf', name: 'Calf' }
  ];
  
  // Store favorites in local storage
  favorites: string[] = [];
  
  // Store exercise completion in local storage
  completions: { [key: string]: number[] } = {};
  
  // Exercise metadata
  exerciseInfo: { [key: string]: { name: string, muscleGroup: string } } = {
    'quad_sets': { name: 'Quadriceps Sets', muscleGroup: 'Quadriceps' },
    'leg_raises': { name: 'Straight Leg Raises', muscleGroup: 'Quadriceps' },
    'hamstring_curls': { name: 'Hamstring Curls', muscleGroup: 'Hamstring' },
    'glute_bridges': { name: 'Glute Bridges', muscleGroup: 'Glutes' },
    'calf_raises': { name: 'Calf Raises', muscleGroup: 'Calf' }
  };

  constructor() {}

  ngOnInit(): void {
    // Load favorites from local storage
    const storedFavorites = localStorage.getItem('exercise-favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
    
    // Load completions from local storage
    const storedCompletions = localStorage.getItem('exercise-completions');
    if (storedCompletions) {
      this.completions = JSON.parse(storedCompletions);
    }
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
  
  toggleFavorite(exerciseId: string): void {
    const index = this.favorites.indexOf(exerciseId);
    if (index === -1) {
      this.favorites.push(exerciseId);
    } else {
      this.favorites.splice(index, 1);
    }
    
    // Save to local storage
    localStorage.setItem('exercise-favorites', JSON.stringify(this.favorites));
  }
  
  isFavorite(exerciseId: string): boolean {
    return this.favorites.includes(exerciseId);
  }
  
  hasFavorites(): boolean {
    return this.favorites.length > 0;
  }
  
  getFavorites(): string[] {
    return this.favorites;
  }
  
  getExerciseName(exerciseId: string): string {
    return this.exerciseInfo[exerciseId]?.name || exerciseId;
  }
  
  getMuscleGroup(exerciseId: string): string {
    return this.exerciseInfo[exerciseId]?.muscleGroup || '';
  }
  
  toggleCompletion(exerciseId: string, day: number): void {
    if (!this.completions[exerciseId]) {
      this.completions[exerciseId] = [];
    }
    
    const index = this.completions[exerciseId].indexOf(day);
    if (index === -1) {
      this.completions[exerciseId].push(day);
    } else {
      this.completions[exerciseId].splice(index, 1);
    }
    
    // Save to local storage
    localStorage.setItem('exercise-completions', JSON.stringify(this.completions));
  }
  
  isCompleted(exerciseId: string, day: number): boolean {
    return this.completions[exerciseId]?.includes(day) || false;
  }
  
  getCompletionText(exerciseId: string): string {
    const completed = this.completions[exerciseId]?.length || 0;
    return `${completed}/7 days completed`;
  }
}