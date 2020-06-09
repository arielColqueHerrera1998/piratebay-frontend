import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AgregarUsuariosComponent } from "./../../dialog/agregar-usuarios/agregar-usuarios.component";
export interface PeriodicElement {
  id: number;
  nombre: string;
  correo: string;
  numero: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, nombre: "Hydrogen", correo: "a", numero: "H" },
];

@Component({
  selector: "app-gestion-usuarios",
  templateUrl: "./gestion-usuarios.component.html",
  styleUrls: ["./gestion-usuarios.component.scss"],
})
export class GestionUsuariosComponent implements OnInit {
  displayedColumns: string[] = ["id", "nombre", "correo", "numero"];
  dataSource = ELEMENT_DATA;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  agregarUsuario() {
    console.log("agregar usuario");
    const dialogRef = this.dialog.open(AgregarUsuariosComponent, {
      width: "300px",
    });
    // this.dialog.open(AgregarUsuariosComponent);
  }
  actualizarLista() {
    console.log("actualizar lista");
  }
}
