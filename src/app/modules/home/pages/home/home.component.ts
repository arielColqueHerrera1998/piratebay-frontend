import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
  irGestionUsuario() {
    console.log("gestion usuarios");
    this.router.navigate(["gestion-usuarios"], { relativeTo: this.route });
    //this.router.navigate(["gestion-usuarios"], { relativeTo: this.route });
  }
  irGestionProductos() {
    console.log("gestion productos");
  }
  salir() {
    console.log("salir");
  }

  

}
