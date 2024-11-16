import { Component } from '@angular/core';
import {EventCardComponent}  from '../event-card/event-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
