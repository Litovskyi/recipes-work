// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {hostname} from 'os';
import {firebaseConfig} from 'firebase-functions';

export const environment = {
  production: false,
  stage: 'emulator',
  firebaseConfig: {
    apiKey: 'AIzaSyBWW4XiHJYlTX-hjv6MLQ627cn50WCDWAg',
    authDomain: 'recipe-work-b1ba6.firebaseapp.com',
    databaseURL: 'https://recipe-work-b1ba6.firebaseio.com',
    projectId: 'recipe-work-b1ba6',
    storageBucket: 'recipe-work-b1ba6.appspot.com',
    messagingSenderId: '468326628003',
    appId: '1:468326628003:web:4bc75e189f779f8668dd16',
    measurementId: 'G-ECDPBRZ0XC'
  }
};

if (location.hostname === 'localhost') {
  // @ts-ignore
  environment.firebaseConfig = {
    databaseURL: 'http://localhost:9000/?ns=recipe-work-b1ba6'
  };
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
