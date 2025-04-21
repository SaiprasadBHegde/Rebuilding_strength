import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true
})
export class AppComponent {
  title = 'my-fracture-recovery-journey';
}
