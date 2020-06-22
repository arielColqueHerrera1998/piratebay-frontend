import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "../../../../models/usuario";
import * as jwt_decode from "jwt-decode";
import { Router, ActivatedRoute } from "@angular/router";
import { RestapiService } from "../../restapi.service";
@Component({
  selector: "app-agregar-usuarios",
  templateUrl: "./agregar-usuarios.component.html",
  styleUrls: ["./agregar-usuarios.component.scss"],
})
export class AgregarUsuariosComponent implements OnInit {
  mostrarGestion: boolean = false;
  nuevoTokenUsuario: string;
  nuevoTokenRefresh: string;

  nombreUsuario: string;
  numeroTelefono: string;
  correo: string;
  contrasenia: string;

  usuario: UsuarioModel = {
    username: this.nombreUsuario,
    email: this.numeroTelefono,
    phoneNumber: this.correo,
    contrasenia: this.contrasenia,
    carUserStatus: "ACTIVE",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RestapiService
  ) {}

  ngOnInit() {
  }
  agregarUsuario() {
    console.log(this.usuario);
  }

}
