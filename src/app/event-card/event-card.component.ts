import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class EventCardComponent implements OnInit {
  events: any[] = [];
  vendors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.fetchVendors();
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

  fetchVendors () {
    this.http.get<any[]>('http://localhost:8080/api/vendors/get-vendors').subscribe({
      next: (data) => {
        this.vendors = data;
      },
      error: (error) => {
        console.error('Error fetching vendors:', error);
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
  showAddEventForm = false;
  newEvent = {
    eventName: '',
    eventPrice: null,
    ticketsToRelease: null,
    releasedTickets: 0,
    soldTickets: 0,
    createdVendor: { userId: 1 }, // Example vendor ID
    isEventActive: false,
    selectedVendorId: null,
  };


  toggleAddEventForm() {
    this.showAddEventForm = !this.showAddEventForm;
  }

  cancelAddEventForm() {
    this.showAddEventForm = false;
  }

  addEvent() {
    if (
      this.newEvent.eventName &&
      this.newEvent.eventPrice &&
      this.newEvent.ticketsToRelease
    ) {
      const eventPayload = {
        eventId: 0,
        eventName: this.newEvent.eventName,
        eventPrice: this.newEvent.eventPrice,
        ticketsToRelease: this.newEvent.ticketsToRelease,
        releasedTickets: 0,
        soldTickets: 0,
        createdVendor: {
          userId: this.newEvent.selectedVendorId // Use the selected vendor ID
        }
      };

      this.http.post('http://localhost:8080/events/add', eventPayload).subscribe({
        next: (response) => {
          console.log('Event added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding event:', error);
        }
      });

      // Reset form and close it
      this.newEvent = {
        eventName: '',
        eventPrice: null,
        ticketsToRelease: null,
        releasedTickets: 0,
        soldTickets: 0,
        createdVendor: { userId: 0 },
        isEventActive: false,
        selectedVendorId: null,
      };
      this.showAddEventForm = false;
    }
  }
}
