import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-system-config-card',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './system-config-card.component.html',
  styleUrl: './system-config-card.component.css'
})
export class SystemConfigCardComponent implements OnInit {

  constructor(private http: HttpClient) {}

  systemConfig: any = {};
  ngOnInit(): void {
    this.fetchSystemConfig();
  }

  fetchSystemConfig() {
    this.http.get<any[]>('http://localhost:8080/get-system-config').subscribe({
      next: (data) => {
        this.systemConfig = data;
      },
      error: (error) => {
        console.error('Error fetching system config:', error);
      }
    });
  }

}
