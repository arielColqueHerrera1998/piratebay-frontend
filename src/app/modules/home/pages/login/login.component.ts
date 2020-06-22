import { Component, OnInit, ɵConsole } from "@angular/core";
import { RestapiService } from "../../restapi.service";
import { Router } from "@angular/router";
import { TokensModel } from "./../../../../models/tokens";

// This lets me use jquery
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  nombreUsuario: string = "";
  contrasenia: string = "";
  message: any;
  tokenUser: string;
  tokenRefresh: string;

  constructor(private service: RestapiService, private router: Router) {}
  flag: boolean = false;

  ngOnInit() {
    this.service.removeTokens();

  }
  doLogin() {
    var name: string;
    //console.log(this.nombreUsuario, this.contrasenia);
    let resp = this.service.login(this.nombreUsuario, this.contrasenia);
    //console.log(resp);
    resp.subscribe(
      (data) => {
        this.router.navigate(["/home"]);
        // Object.keys(data);
        console.log(data);
        for (let key in data) {
          if (key == "refresh ") {
            this.tokenRefresh = data[key];
          }
          if (key == "authentication ") {
            this.tokenUser = data[key];
          }
          //console.log ('key: ' +  key + ',  value: ' + data[key]);
        }
        //console.log("re:" + this.tokenRefresh);
        //.log("us:" + this.tokenUser);
        localStorage.setItem("token", this.tokenUser);
        localStorage.setItem("refresh", this.tokenRefresh);
      },
      (error) => {
        alert(
          "Error al ingresar nombre o contraseña " +
            this.nombreUsuario +
            " : " +
            this.contrasenia
        );
        this.showError();
      }
    );
  }
  showError() {
    this.nombreUsuario = "";
    this.contrasenia = "";
  }
}
