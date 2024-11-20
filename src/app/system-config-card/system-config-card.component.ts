import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-system-config-card',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './system-config-card.component.html',
  styleUrl: './system-config-card.component.css'
})
export class SystemConfigCardComponent {

}
