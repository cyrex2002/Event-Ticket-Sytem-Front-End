import { Component } from '@angular/core';
import {EventCardComponent}  from '../event-card/event-card.component';
import {SystemConfigCardComponent} from '../system-config-card/system-config-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventCardComponent, SystemConfigCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
