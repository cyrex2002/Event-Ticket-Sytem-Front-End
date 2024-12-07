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

}
