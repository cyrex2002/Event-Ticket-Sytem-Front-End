import {Component, OnInit} from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-vendor-card',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './vendor-card.component.html',
  styleUrl: './vendor-card.component.css'
})
export class VendorCardComponent implements OnInit{
 constructor(private http: HttpClient) {}

 vendors: any[] = [];
  showAddVendorForm: boolean = false;
  newVendor: { ticketsPerRelease: number; releaseInterval: string } = {
    ticketsPerRelease: 0,
    releaseInterval: '',
  };

 ngOnInit() {
   this.fetchVendors();
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
  toggleAddVendorForm() {
    this.showAddVendorForm = !this.showAddVendorForm;
  }

  addVendor() {
    // Example POST request to add a new vendor
    this.http.post('http://localhost:8080/api/vendors/add-vendor', this.newVendor).subscribe({
      next: () => {
        this.fetchVendors();
      },
      error: (error) => {
        console.error('Error adding vendor:', error);
      },
    });
    this.showAddVendorForm = false;
  }

  cancelAddVendorForm() {
    this.showAddVendorForm = false;
  }
}
