import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { RestapiService } from "../../restapi.service";
import { UsuarioModel } from "./../../../../models/usuario";
import { Router, ActivatedRoute } from "@angular/router";
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
  usuariosLista: UsuarioModel[];
  nuevoTokenUsuario: string;
  nuevoTokenRefresh: string;
  //ELEMENT_DATA: UsuarioModel[] = [
  // { id: 1, nombre: "Hydrogen", email: "a", telefono: "H" , estado:"1"},
  //];

  displayedColumns: string[] = ["id", "nombre", "correo", "telefono", "estado"];
  //dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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
    if (x == null) {
      this.router.navigate(["/"]);
      alert("No se tienen tokens");
    } else {
      this.refresh();
    }
  }

  refresh() {
    var x = localStorage.getItem("token");
    this.service.getUserData().subscribe(
      (data: UsuarioModel[]) => {
        this.dataSource.data = data;
        this.refreshTokens();
      },
      (error) => {
        if (x != null) {
          alert("EL token caduco");
          this.service.removeTokens();
          this.router.navigate(["/"]);
        }
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
    //this.refresh();
    console.log(this.usuariosLista.length);
    console.log("actualizar lista");
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
