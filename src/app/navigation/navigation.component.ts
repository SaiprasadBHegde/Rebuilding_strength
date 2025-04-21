import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NavigationComponent implements OnInit {
  isMobileMenuOpen = false;
  isExercisesDropdownOpen = false;
  isMobileExercisesDropdownOpen = false;
  isScrolled = false;
  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Track current route for active state management
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
      
      // Close mobile menu on navigation
      this.isMobileMenuOpen = false;
      
      // Auto-open mobile exercises dropdown if on an exercises page
      if (this.currentRoute.includes('/exercises/')) {
        this.isMobileExercisesDropdownOpen = true;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: any) {
    // Close mobile menu when clicking outside (handled by overlay)
    // This is a backup in case the overlay click doesn't work
    if (this.isMobileMenuOpen && !event.target.closest('nav')) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent scrolling when mobile menu is open
    if (this.isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  toggleExercisesDropdown() {
    this.isExercisesDropdownOpen = !this.isExercisesDropdownOpen;
  }

  toggleMobileExercisesDropdown() {
    this.isMobileExercisesDropdownOpen = !this.isMobileExercisesDropdownOpen;
  }

  // Helper method to check if any exercises route is active
  isExercisesActive(): boolean {
    return this.currentRoute.includes('/exercises');
  }
}