import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [CommonModule, MatIconModule],
})
export class HomeModule {}
