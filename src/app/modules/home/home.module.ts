import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { GestionUsuariosComponent } from "./pages/gestion-usuarios/gestion-usuarios.component";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [HomeComponent, LoginComponent, GestionUsuariosComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
  ],
})
export class HomeModule {}
