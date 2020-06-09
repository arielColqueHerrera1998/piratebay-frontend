import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeModule } from "./modules/home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { RestapiService } from './modules/home/restapi.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HomeModule, AppRoutingModule,HttpClientModule, BrowserAnimationsModule],
  providers: [RestapiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
