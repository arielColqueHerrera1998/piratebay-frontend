import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/home/pages/login/login.component";
import { HomeComponent } from "./modules/home/pages/home/home.component";
import { GestionUsuariosComponent } from "./modules/home/pages/gestion-usuarios/gestion-usuarios.component";
import { GestionPedidosComponent } from "./modules/home/pages/gestion-pedidos/gestion-pedidos.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "home",
    children: [
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "gestion-usuarios", component: GestionUsuariosComponent },
      { path: "gestion-pedidos", component: GestionPedidosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
