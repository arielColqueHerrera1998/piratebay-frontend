import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { RestapiService } from "../../restapi.service";
import { UsuarioModel } from "./../../../../models/usuario";
import { Router, ActivatedRoute } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AgregarUsuariosComponent } from "./../../dialog/agregar-usuarios/agregar-usuarios.component";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-gestion-usuarios",
  templateUrl: "./gestion-usuarios.component.html",
  styleUrls: ["./gestion-usuarios.component.scss"],
})
export class GestionUsuariosComponent implements OnInit {
  mostrarGestion: boolean = false;
  usuariosLista: UsuarioModel[];
  nuevoTokenUsuario: string;
  nuevoTokenRefresh: string;

  displayedColumns: string[] = ["id", "nombre", "correo", "telefono", "estado"];
  dataSource = new MatTableDataSource<UsuarioModel>();

  constructor(
    private service: RestapiService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    var x = localStorage.getItem("token");
    // console.log("token actual:" + x);
    if (x == null) {
      this.router.navigate(["/"]);
      alert("No se tienen tokens");
    } else {
      this.refreshTokens();
      var tokenUser = localStorage.getItem("token");
    }
  }

  refreshTable() {
    console.log("refrescando tabla");
    this.service.getUserData().subscribe(
      (data: UsuarioModel[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }

  agregarUsuario() {
    console.log("agregar usuario");
    const dialogRef = this.dialog.open(AgregarUsuariosComponent, {
      width: "300px",
    });
  }
  actualizarLista() {
    console.log(this.usuariosLista.length);
    console.log("actualizar lista");
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
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
          //console.log("key gestion: " + key + ",  value: " + data[key]);
        }
        let tokenInfo = this.getDecodedAccessToken(this.nuevoTokenUsuario); // decode token
        let expireDate = tokenInfo.exp; // get token expiration dateTime
        //console.log(tokenInfo);

        for (let keyInfo in tokenInfo) {
          if (keyInfo == "features") {
            var informacionToken = tokenInfo[keyInfo];
            for (var i = 0; i < informacionToken.length; i++) {
              if (informacionToken[i] == "PAGE_USER_MANAGEMENT") {
                console.log("page user management logged");
                this.mostrarGestion = true;
              } else {
              }
            }
          }
        }
        localStorage.setItem("token", this.nuevoTokenUsuario);
        localStorage.setItem("refresh", this.nuevoTokenRefresh);
        //console.log("Tokens refrescados en gestion ");
        this.refreshTable();
      },
      (error) => {
        console.log("Timeout token refresh");
        this.service.removeTokens();
        this.router.navigate(["/"]);
      }
    );
  }
}
