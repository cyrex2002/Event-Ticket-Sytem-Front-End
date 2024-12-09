import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-customer-card',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.css'
})
export class CustomerCardComponent implements OnInit{
  constructor(private http: HttpClient) {}
  customers: any[] = [];
  events: any[] = [];

  ngOnInit(): void {
    this.fetchCustomers();
    this.fetchEvents();
  }

  fetchCustomers (){
    this.http.get<any []>('http://localhost:8080/customers/all').subscribe({
        next:(data) => {this.customers = data},
        error: (error) => {
          console.error('Error fetching customers:', error);
        }
      }
    )
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

  startBuying(customer: any) {
    console.log('Selected Event ID:', customer.selectedEventId);
    console.log('Available Events:', this.events);

    if (customer.selectedEventId) {
      const selectedEvent = this.events.find(
        (event) => event.eventId === Number(customer.selectedEventId)
      );


      if (!selectedEvent) {
        alert('Selected event details not found.');
        return;
      }

      // Construct the object
      const purchaseRequest = {
        event: {
          eventId: selectedEvent.eventId,
          eventName: selectedEvent.eventName,
          eventPrice: selectedEvent.eventPrice,
          ticketsToRelease: selectedEvent.ticketsToRelease,
          releasedTickets: selectedEvent.releasedTickets,
          soldTickets: selectedEvent.soldTickets,
        },
        numberOfTickets: customer.numberOfTickets,
        userId: customer.userId,
      };

      console.log('Purchase Request:', purchaseRequest);

      // Send the object to the backend
      this.http.post('http://localhost:8080/customers/StartBuying', purchaseRequest).subscribe({
        next: (response) => {
          console.log('Purchase response:', response);
          alert('Tickets purchased successfully!');
        },
        error: (error) => {
          console.error('Error purchasing tickets:', error);
        }
      });
    }
  }

  showAddCustomerForm = false;
  newCustomer = {
    numberOfTickets: null
  };

  toggleAddCustomerForm() {
    this.showAddCustomerForm = !this.showAddCustomerForm;
  }

  cancelAddCustomerForm() {
    this.showAddCustomerForm = false;
  }

  addCustomer() {
    if (this.newCustomer.numberOfTickets) {
      // Add customer logic (API call or adding directly)
      this.http.post('http://localhost:8080/customers/add',this.newCustomer).subscribe(
        {
          next: (response) => {
            console.log('Customer added successfully:', response);
          },
          error: (error) => {
            console.error('Error adding customer:', error);
          }
        }
      )

      this.newCustomer = { numberOfTickets: null};
      this.showAddCustomerForm = false;
    }
  }

}
