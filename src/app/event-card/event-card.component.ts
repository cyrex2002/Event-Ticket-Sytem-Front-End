import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    imports: [CommonModule, HttpClientModule]
})
export class EventCardComponent implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<any[]>('http://localhost:8080/events/all').subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  toggleEvent(event: any) {
    event.isActive = !event.isActive; // Toggle the state

    const vendorPayload = this.createVendorPayload(event);

    if (event.isActive) {
      this.startSelling(vendorPayload);
    } else {
      this.stopSelling(event);
    }
  }

  createVendorPayload(event: any) {
    return {
      event: {
        createdVendor: event.createdVendor,
        eventId: event.eventId,
        eventName: event.eventName,
        eventPrice: event.eventPrice,
        ticketsToRelease: event.ticketsToRelease,
      },
      userId: event.createdVendor.userId,
      ticketsPerRelease: event.createdVendor.ticketsPerRelease,
      releaseInterval: event.createdVendor.releaseInterval,
    };
  }

  startSelling(vendorPayload: any) {
    this.http.post('http://localhost:8080/api/vendors/start-selling', vendorPayload).subscribe({
      next: (response) => {
        console.log('Started selling:', response);
      },
      error: (error) => {
        console.error('Error starting ticket selling:', error);
      }
    });
  }

  stopSelling(event: any) {
    // Dummy API call for stopping ticket selling
    this.http.post('http://localhost:8080/api/vendors/stop-selling', event).subscribe({
      next: (response) => {
        console.log('Stopped selling:', response);
      },
      error: (error) => {
        console.error('Error stopping ticket selling:', error);
      }
    });
  }
}
