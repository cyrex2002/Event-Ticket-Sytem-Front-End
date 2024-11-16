import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
    event.isActive = !event.isActive; // Toggle the isActive state
    // Optionally, you can make an HTTP request here to update the event state on the server
  }

}
