import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "../../../../models/usuario";

@Component({
  selector: "app-agregar-usuarios",
  templateUrl: "./agregar-usuarios.component.html",
  styleUrls: ["./agregar-usuarios.component.scss"],
})
export class AgregarUsuariosComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
  agregarUsuario() {
    console.log(this.usuario);
  }
}
