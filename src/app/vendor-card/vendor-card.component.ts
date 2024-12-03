import {Component, OnInit} from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-vendor-card',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './vendor-card.component.html',
  styleUrl: './vendor-card.component.css'
})
export class VendorCardComponent implements OnInit{
 constructor(private http: HttpClient) {}

 vendors: any[] = [];

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
}
