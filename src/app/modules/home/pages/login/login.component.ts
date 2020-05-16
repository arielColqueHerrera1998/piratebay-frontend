import { Component, OnInit, ɵConsole } from "@angular/core";
import { RestapiService } from "../../restapi.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  nombreUsuario: string = "";
  contrasenia: string = "";
  message: any;
  // loginbtn() {
  //   console.log("here");
  //   console.log(
  //     "n : " + this.nombreUsuario + " | " + "p : " + this.contrasenia
  //   );
  // }
  constructor(private service: RestapiService, private router: Router) {}

  ngOnInit() {}
  doLogin() {
    console.log(this.nombreUsuario, this.contrasenia);
    let resp = this.service.login(this.nombreUsuario, this.contrasenia);
    //console.log(resp);
    resp.subscribe((data) => {
      console.log("entro link");
      this.message = data;
      //console.log("data : "+data);
      this.router.navigate(["/home"]);
    });
  }
}
