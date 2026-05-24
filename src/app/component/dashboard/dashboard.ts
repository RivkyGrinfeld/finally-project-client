import { Component, inject, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CustomersService } from '../../service/customers-service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxEchartsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class dashboard implements OnInit {
  userService: UserService = inject(UserService);
  customerSevice: CustomersService = inject(CustomersService);

  pieOptions = {};
  barOptions = {};
  lineOptions = {};
  onlineUsers = 0;

  // Animated counters
  animatedCustomers = 0;
  animatedJobs = 0;
  animatedSatisfaction = 0;
  animatedMatches = 0;

  async ngOnInit() {
    await this.loadMegama();
    this.initCharts();
    this.simulateOnlineUsers();
    this.startCountAnimation();
  }

  simulateOnlineUsers() {
    this.onlineUsers = Math.floor(Math.random() * 66) + 15;
  }

  startCountAnimation() {
    const targets = {
      customers: this.customerSevice.customers.length || 0,
      jobs: 12,
      satisfaction: 87,
      matches: 24
    };

    const duration = 1500; // 1.5 שניות
    const steps = 40;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // easeOutQuad for smooth deceleration
      const eased = 1 - (1 - progress) * (1 - progress);

      this.animatedCustomers = Math.round(eased * targets.customers);
      this.animatedJobs = Math.round(eased * targets.jobs);
      this.animatedSatisfaction = Math.round(eased * targets.satisfaction);
      this.animatedMatches = Math.round(eased * targets.matches);

      if (step >= steps) {
        clearInterval(timer);
        // ודא שהערכים הסופיים מדויקים
        this.animatedCustomers = targets.customers;
        this.animatedJobs = targets.jobs;
        this.animatedSatisfaction = targets.satisfaction;
        this.animatedMatches = targets.matches;
      }
    }, interval);
  }

  async loadMegama() {
    if (this.customerSevice.customers.length === 0)
      this.customerSevice.customers = await firstValueFrom(this.customerSevice.init());
  }

  initCharts() {
    // פילוח לקוחות (Pie)
    this.pieOptions = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', borderRadius: 8 },
      legend: {
        bottom: '5%',
        textStyle: { color: '#6b7280', fontSize: 12 }
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 3 },
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: 14, fontWeight: 'bold' }
          },
          data: [
            { value: 45, name: 'חדשים', itemStyle: { color: '#818cf8' } },
            { value: 30, name: 'חוזרים', itemStyle: { color: '#34d399' } },
            { value: 25, name: 'לא פעילים', itemStyle: { color: '#fbbf24' } }
          ]
        }
      ]
    };

    // הכנסות (Bar)
    this.barOptions = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', borderRadius: 8 },
      grid: { top: 20, right: 20, bottom: 40, left: 50 },
      xAxis: {
        type: 'category',
        data: ['רבעון 1', 'רבעון 2', 'רבעון 3', 'רבעון 4'],
        axisLabel: { color: '#6b7280', fontSize: 12 },
        axisLine: { lineStyle: { color: '#e5e7eb' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#6b7280', fontSize: 12 },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLine: { show: false }
      },
      series: [
        {
          type: 'bar',
          data: [120, 300, 200, 150],
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#818cf8' },
                { offset: 1, color: '#c4b5fd' }
              ]
            }
          },
          barWidth: '45%'
        }
      ]
    };

    // מגמה (Line)
    this.lineOptions = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', borderRadius: 8 },
      grid: { top: 20, right: 20, bottom: 40, left: 50 },
      xAxis: {
        type: 'category',
        data: ['שבוע 1', 'שבוע 2', 'שבוע 3', 'שבוע 4'],
        axisLabel: { color: '#6b7280', fontSize: 12 },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#6b7280', fontSize: 12 },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLine: { show: false }
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: [50, 80, 60, 120],
          lineStyle: { color: '#7c3aed', width: 3 },
          itemStyle: { color: '#7c3aed' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(124, 58, 237, 0.2)' },
                { offset: 1, color: 'rgba(124, 58, 237, 0.02)' }
              ]
            }
          },
          symbol: 'circle',
          symbolSize: 8
        }
      ]
    };
  }
}
