import { Component } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
@Component({
  selector: 'app-dashboard',
   standalone: true,
  imports: [NgxEchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class dashboard {

  // פילוח לקוחות (Pie)
  pieOptions = {
    backgroundColor: '#0b1220',
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '70%',
        data: [
          { value: 45, name: 'חדשים' },
          { value: 30, name: 'חוזרים' },
          { value: 25, name: 'לא פעילים' }
        ],
        label: { color: '#fff' }
      }
    ]
  };

  // הכנסות (Bar)
  barOptions = {
    backgroundColor: '#0b1220',
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['א', 'ב', 'ג', 'ד'],
      axisLabel: { color: '#cbd5e1' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#cbd5e1' }
    },
    series: [
      {
        type: 'bar',
        data: [120, 300, 200, 150],
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: '#38bdf8'
        }
      }
    ]
  };

  // מגמה (Line)
  lineOptions = {
    backgroundColor: '#0b1220',
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['שבוע 1', 'שבוע 2', 'שבוע 3', 'שבוע 4'],
      axisLabel: { color: '#cbd5e1' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#cbd5e1' }
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: [50, 80, 60, 120],
        lineStyle: { color: '#a78bfa' },
        areaStyle: { color: 'rgba(168,139,250,0.2)' }
      }
    ]
  };
}


// import { Component } from '@angular/core';
// import { NgxEchartsModule } from 'ngx-echarts';

// @Component({
//   selector: 'app-dashboard',
//    standalone: true,
//   imports: [NgxEchartsModule],
//    templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css'
// })

// export class dashboard {

//   selectedRange = '7d';
//   loading = false;

//   kpis = { users: 0, revenue: 0, orders: 0 };

//   constructor() {
//     this.loadData();
//   }

//   onRangeChange(range: string) {
//     this.selectedRange = range;
//     this.loadData();
//   }

//   loadData() {
//     this.loading = true;

//     setTimeout(() => {
//       // סימולציה של API
//       this.kpis = {
//         users: this.selectedRange === '7d' ? 1200 : 5400,
//         revenue: this.selectedRange === '7d' ? 22000 : 98000,
//         orders: this.selectedRange === '7d' ? 180 : 760
//       };

//       this.loading = false;
//     }, 800);
//   }

//   get pieOptions() {
//     return {
//       backgroundColor: 'transparent',
//       tooltip: { trigger: 'item' },
//       series: [{
//         type: 'pie',
//         radius: '70%',
//         data: [
//           { value: 50, name: 'חדשים' },
//           { value: 30, name: 'חוזרים' },
//           { value: 20, name: 'לא פעילים' }
//         ],
//         label: { color: '#cbd5e1' }
//       }]
//     };
//   }

//   get barOptions() {
//     return {
//       backgroundColor: 'transparent',
//       tooltip: { trigger: 'axis' },
//       xAxis: {
//         type: 'category',
//         data: ['א', 'ב', 'ג', 'ד'],
//         axisLabel: { color: '#94a3b8' }
//       },
//       yAxis: { axisLabel: { color: '#94a3b8' } },
//       series: [{
//         type: 'bar',
//         data: [120, 300, 200, 150],
//         itemStyle: {
//           borderRadius: [10, 10, 0, 0],
//           color: '#38bdf8'
//         }
//       }]
//     };
//   }

//   get lineOptions() {
//     return {
//       backgroundColor: 'transparent',
//       tooltip: { trigger: 'axis' },
//       xAxis: {
//         type: 'category',
//         data: ['ש1', 'ש2', 'ש3', 'ש4'],
//         axisLabel: { color: '#94a3b8' }
//       },
//       yAxis: { axisLabel: { color: '#94a3b8' } },
//       series: [{
//         type: 'line',
//         smooth: true,
//         data: [40, 80, 60, 140],
//         lineStyle: { color: '#a78bfa' },
//         areaStyle: { color: 'rgba(168,139,250,0.15)' }
//       }]
//     };
//   }
// }
