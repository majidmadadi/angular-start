import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {QuickListApp} from './app/quicklist/app';

bootstrapApplication(QuickListApp, appConfig)
  .catch((err) => console.error(err));
