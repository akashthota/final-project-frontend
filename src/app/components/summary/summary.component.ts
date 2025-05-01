import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, BaseChartDirective]
})
export class SummaryComponent implements OnInit {
  summaryData = {
    totalOrders: 1250,
    totalRevenue: 75000,
    averageOrderValue: 60,
    topProducts: [
      { name: 'Product A', sales: 150, revenue: 4500 },
      { name: 'Product B', sales: 120, revenue: 3600 },
      { name: 'Product C', sales: 100, revenue: 3000 },
      { name: 'Product D', sales: 80, revenue: 2400 }
    ]
  };

  displayedColumns: string[] = ['name', 'sales', 'revenue'];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55], label: 'Revenue' },
      { data: [28, 48, 40, 19, 86, 27], label: 'Orders' }
    ]
  };

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.analyticsService.getRevenueData().subscribe({
      next: (data) => {
        this.barChartData = data;
      },
      error: (error) => {
        console.error('Error loading revenue data:', error);
      }
    });
  }
}
