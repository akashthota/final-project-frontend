import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService, NewsItem, DashboardStats } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];
  unccNews: NewsItem[] = [];
  loading = true;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadNews();
  }

  private loadDashboardData(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats: DashboardStats) => {
        this.cards = [
          { title: 'Total Users', value: stats.totalUsers, icon: 'people' },
          { title: 'Active Sessions', value: stats.activeSessions, icon: 'timer' },
          { title: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: 'attach_money' },
          { title: 'New Orders', value: stats.newOrders, icon: 'shopping_cart' }
        ];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.loading = false;
      }
    });
  }

  private loadNews(): void {
    this.dashboardService.getNews().subscribe({
      next: (news) => {
        this.unccNews = news;
      },
      error: (error) => {
        console.error('Error loading news:', error);
      }
    });
  }
}
