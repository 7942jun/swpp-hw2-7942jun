import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api 
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppRoutingModule } from './/app-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { CreateComponent } from './create/create.component';
import { AuthService } from './auth.service';
import { AppService } from './app.service';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ArticlesComponent,
    CreateComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
