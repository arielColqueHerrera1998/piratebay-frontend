import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RestapiService } from "../../restapi.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  nuevoTokenUsuario: string;
  nuevoTokenRefresh: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RestapiService
  ) {}

  ngOnInit() {
    var x = localStorage.getItem("token");
    if (x == null) {
      alert("No se tienen tokens");
      this.router.navigate(["/"]);
    } else {
      this.refreshTokens();
    }
  }
  irGestionUsuario() {
    this.router.navigate(["gestion-usuarios"], { relativeTo: this.route });
    //this.router.navigate(["gestion-usuarios"], { relativeTo: this.route });
  }
  irGestionProductos() {
    console.log("gestion productos");
  }
  salir() {
    this.service.removeTokens();
    this.router.navigate(["/"]);
  }

  refreshTokens() {
    var tokenUsuario = localStorage.getItem("refresh");
    let resp = this.service.refresh(tokenUsuario);
    resp.subscribe(
      (data) => {
        console.log(data);
        for (let key in data) {
          if (key == "refresh ") {
            this.nuevoTokenRefresh = data[key];
          }
          if (key == "authentication ") {
            this.nuevoTokenUsuario = data[key];
          }
          //console.log ('key: ' +  key + ',  value: ' + data[key]);
        }
        //console.log("re:" + this.tokenRefresh);
        //.log("us:" + this.tokenUser);
        localStorage.setItem("token", this.nuevoTokenUsuario);
        localStorage.setItem("refresh", this.nuevoTokenRefresh);
        console.log("Tokens refrescados ");
      },
      (error) => {
        console.log("Timeout token refresh");
        this.service.removeTokens();
        this.router.navigate(["/"]);
      }
    );
  }
}
