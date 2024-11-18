import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    event.isActive = !event.isActive; // Toggle the state

    const vendorPayload = this.createVendorPayload(event);

    // Call the respective API based on the new state
    if (event.isActive) {
      this.startSelling(vendorPayload);
    } else {
      this.stopSelling(vendorPayload);
    }
  }

  createVendorPayload(event: any) {
    return {
      event: {
        eventId: event.eventId,
        eventName: event.eventName,
        eventPrice: event.eventPrice,
        ticketsToSell: event.ticketsToSell,
      },
      userId: event.createdVendor.userId,
      ticketsPerRelease: event.createdVendor.ticketsPerRelease,
      releaseInterval: event.createdVendor.releaseInterval,
    };
  }

  startSelling(vendorPayload: any) {
    console.log('Payload for starting selling:', vendorPayload); // Log the payload
    this.http.post('http://localhost:8080/api/vendors/start-selling', vendorPayload).subscribe(
      (response) => {
        console.log('Started selling:', response);
      },
      (error) => {
        console.error('Error starting ticket selling:', error);
      }
    );
  }

  stopSelling(vendorPayload: any) {
    // Dummy API call for stopping ticket selling
    this.http.post('http://localhost:8080/api/vendors/stop-selling', vendorPayload).subscribe(
      (response) => {
        console.log('Stopped selling:', response);
      },
      (error) => {
        console.error('Error stopping ticket selling:', error);
      }
    );
  }
}
