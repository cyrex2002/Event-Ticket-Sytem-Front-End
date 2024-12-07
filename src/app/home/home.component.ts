import { Component } from '@angular/core';
import {EventCardComponent}  from '../event-card/event-card.component';
import {SystemConfigCardComponent} from '../system-config-card/system-config-card.component';
import {VendorCardComponent} from '../vendor-card/vendor-card.component';
import {CustomerCardComponent} from '../customer-card/customer-card.component';

@Component({
    selector: 'app-home',
  imports: [EventCardComponent, SystemConfigCardComponent, VendorCardComponent, CustomerCardComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
}
