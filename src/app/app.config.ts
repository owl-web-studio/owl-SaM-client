import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function initialize(
  authService: AuthService
) {

  return async () => {
    authService.autoLogin().subscribe(v => {
      console.log('[app.config.ts]: auto login successfully');
    });
    console.log('[app.config.ts]: app initialized');
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [AuthService],
      multi: true
    },
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        defaultLanguage: 'ru',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    MessageService
  ]
};
