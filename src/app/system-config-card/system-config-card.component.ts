import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-system-config-card',
    imports: [CommonModule, HttpClientModule,BaseChartDirective],
    templateUrl: './system-config-card.component.html',
    styleUrl: './system-config-card.component.css'
})
export class SystemConfigCardComponent implements OnInit {

  constructor(private http: HttpClient) {}

  systemConfig: any = {};
  totalTickets: number = 0;

  public pieChartData: ChartData<'pie'> = {
    labels: ['Total Tickets', 'Free Space'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#42A5F5', '#66BB6A'], // Blue and Green colors
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  ngOnInit(): void {
    this.fetchSystemConfig();
    this.fetchTotalTickets();
  }

  fetchSystemConfig() {
    this.http.get<any[]>('http://localhost:8080/get-system-config').subscribe({
      next: (data) => {
        this.systemConfig = data;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Error fetching system config:', error);
      }
    });
  }

  fetchTotalTickets(){
    this.http.get<number>('http://localhost:8080/TicketPool/ticket-count').subscribe({
      next:(data) =>{
        this.totalTickets = data;
      },
      error:(err) =>{
        console.error('Error fetching total number of tickets')
      }
    })
  }

  updateChartData() {
    const totalTickets = this.totalTickets || 0;
    const maxCapacity = this.systemConfig.maxTicketCapacity || 0;
    const freeSpace = maxCapacity - totalTickets;

    this.pieChartData.datasets[0].data = [totalTickets, freeSpace];
    this.pieChartData = { ...this.pieChartData };
  }


}
