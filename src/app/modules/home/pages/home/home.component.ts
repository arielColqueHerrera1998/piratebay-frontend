import { Component, OnInit, ɵConsole } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RestapiService } from "../../restapi.service";
import * as jwt_decode from "jwt-decode";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  mostrarGestion: boolean = false;
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
  }

  irGestionPedidos() {
    this.router.navigate(["gestion-pedidos"], { relativeTo: this.route });
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
        //console.log(data);
        for (let key in data) {
          if (key == "refresh ") {
            this.nuevoTokenRefresh = data[key];
          }
          if (key == "authentication ") {
            this.nuevoTokenUsuario = data[key];
          }
        }
        let tokenInfo = this.getDecodedAccessToken(this.nuevoTokenUsuario); // decode token
        let expireDate = tokenInfo.exp; // get token expiration dateTime
        //console.log(tokenInfo);
        //console.log("expire token:" + expireDate);
        //console.log("----------------");
        for (let keyInfo in tokenInfo) {
          if (keyInfo == "features") {
            var informacionToken = tokenInfo[keyInfo];
            //console.log("tamanio : "+tokenInfo[keyInfo].length);
            //console.log("key: " + keyInfo + ",  value: " + tokenInfo[keyInfo]);
            for (var i = 0; i < informacionToken.length; i++) {
              // Iterate over numeric indexes from 0 to 5, as everyone expects.
              //console.log(i+" : "+informacionToken[i]);
              if (informacionToken[i] == "PAGE_USER_MANAGEMENT") {
                console.log("page user management logged");
                this.mostrarGestion = true;
              } else {
                //this.mostrarGestion = false;
              }
            }
            //var roles = tokenInfo[keyInfo].split(",");
            //var x = roles[0];
            //console.log("rol : "+x);
          }
        }
        localStorage.setItem("token", this.nuevoTokenUsuario);
        localStorage.setItem("refresh", this.nuevoTokenRefresh);
        //console.log("Tokens refrescados ");
      },
      (error) => {
        console.log("Timeout token refresh");
        this.service.removeTokens();
        this.router.navigate(["/"]);
      }
    );
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
