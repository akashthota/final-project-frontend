import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    BaseChartDirective
  ]
})
export class ReportComponent implements OnInit {
  filterForm: FormGroup;
  reportData = {
    transactions: [
      { id: 1, date: '2023-11-01', customer: 'John Doe', amount: 150, status: 'Completed' },
      { id: 2, date: '2023-11-02', customer: 'Jane Smith', amount: 250, status: 'Pending' },
      { id: 3, date: '2023-11-03', customer: 'Bob Johnson', amount: 350, status: 'Completed' },
      { id: 4, date: '2023-11-04', customer: 'Alice Brown', amount: 450, status: 'Failed' }
    ]
  };

  displayedColumns: string[] = ['id', 'date', 'customer', 'amount', 'status'];
  statusOptions: string[] = ['All', 'Completed', 'Pending', 'Failed'];

  public lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Monthly Transactions',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)'
      }
    ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  constructor(private formBuilder: FormBuilder, private analyticsService: AnalyticsService) {
    this.filterForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      status: ['All']
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(filters => {
      console.log('Filters changed:', filters);
    });
    this.analyticsService.getTransactionTrends().subscribe({
      next: (data) => {
        this.lineChartData = data;
      },
      error: (error) => {
        console.error('Error loading transaction trends:', error);
      }
    });
  }

  generateReport(): void {
    console.log('Generating report with filters:', this.filterForm.value);
  }

  exportReport(): void {
    console.log('Exporting report...');
  }
}
