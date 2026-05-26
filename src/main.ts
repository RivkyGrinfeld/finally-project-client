// // import { bootstrapApplication } from '@angular/platform-browser';
// // import { appConfig } from './app/app.config';
// // import { App } from './app/app';

// import { bootstrapApplication } from '@angular/platform-browser';
// import { App } from './app/app';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes'; // רשימת ה-routes שלך

// bootstrapApplication(App, {
//   providers: [
//     provideAnimations(),
//     provideHttpClient(),
//     provideRouter(routes) ,
//      // <-- חובה כדי שה-ActivatedRoute יעבוד

//   ]
// });

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),

    provideEchartsCore({
      echarts
    })
  ]
});
