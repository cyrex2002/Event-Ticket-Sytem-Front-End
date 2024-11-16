import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class EventCardComponent implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get('http://localhost:8080/events/all').subscribe((data: any) => {
      this.events = data;
    });
  }

  toggleEvent(event: any) {
    event.isActive = !event.isActive;
  }

}
