import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';

// import { AppRoutes } from './app.routing';
import { LoginModule } from './components/login/login.module';

import { AppComponent } from './app.component';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { setLogLevel } from 'webpack/hot/log';
setLogLevel('none'); // 去除hot console

import { HttpService } from './service/http.service';
import { ApiService } from './service/api.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'angular-ssr-hmr-demo'}),
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserTransferStateModule,
        // AppRoutes,
        LoginModule
    ],
    providers: [
        HttpService,
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string,
        private http: HttpService
    ) {
        const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'in the server';
        console.log(`Running ${platform} with appId=${appId}`);

        if (isPlatformServer(platformId)) { // 服务端渲染
            this.http.serverUrl = 'http://localhost:4000';
        }
    }
}
