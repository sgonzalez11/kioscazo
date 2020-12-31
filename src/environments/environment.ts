// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBbMoO2H7W4vJnBz-3HExf4-YS7ff4lywE',
    authDomain: 'ng-santex-kiosco.firebaseapp.com',
    databaseURL: 'https://ng-santex-kiosco.firebaseio.com',
    projectId: 'ng-santex-kiosco',
    storageBucket: 'ng-santex-kiosco.appspot.com',
    messagingSenderId: '1009835773148'
  }
};
