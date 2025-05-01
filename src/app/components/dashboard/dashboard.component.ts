import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import {
  DashboardService,
  NewsItem,
  DashboardStats,
} from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
    RouterLink,
  ],
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];
  unccNews: NewsItem[] = [];
  loading = true;
  newsLoading = true;
  userName = 'User';
  currentDate = new Date();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadNews();
    // Get user name from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.fullName) {
          this.userName = user.fullName.split(' ')[0];
        }
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }

  private loadDashboardData(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats: DashboardStats) => {
        this.cards = [
          {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: 'people',
            color: '#3f51b5',
            trend: '+5%',
          },
          {
            title: 'Active Sessions',
            value: stats.activeSessions,
            icon: 'timer',
            color: '#ff9800',
            trend: '+2%',
          },
          {
            title: 'Total Revenue',
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: 'attach_money',
            color: '#4caf50',
            trend: '+8%',
          },
          {
            title: 'New Orders',
            value: stats.newOrders,
            icon: 'shopping_cart',
            color: '#e91e63',
            trend: '+12%',
          },
        ];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.loading = false;
        // Add fallback data in case of error
        this.cards = [
          {
            title: 'Total Users',
            value: 0,
            icon: 'people',
            color: '#3f51b5',
            trend: '0%',
          },
          {
            title: 'Active Sessions',
            value: 0,
            icon: 'timer',
            color: '#ff9800',
            trend: '0%',
          },
          {
            title: 'Total Revenue',
            value: '$0',
            icon: 'attach_money',
            color: '#4caf50',
            trend: '0%',
          },
          {
            title: 'New Orders',
            value: 0,
            icon: 'shopping_cart',
            color: '#e91e63',
            trend: '0%',
          },
        ];
      },
    });
  }

  private loadNews(): void {
    this.newsLoading = true;
    this.dashboardService.getNews().subscribe({
      next: (news) => {
        this.unccNews = news;
        this.newsLoading = false;
      },
      error: (error) => {
        console.error('Error loading news:', error);
        this.newsLoading = false;
      },
    });
  }
}
