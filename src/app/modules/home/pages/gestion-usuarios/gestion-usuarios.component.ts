import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { RestapiService } from "../../restapi.service";
import { UsuarioModel } from "./../../../../models/usuario";
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
  //ELEMENT_DATA: UsuarioModel[] = [
  // { id: 1, nombre: "Hydrogen", email: "a", telefono: "H" , estado:"1"},
  //];

  displayedColumns: string[] = ["id", "nombre", "correo", "telefono", "estado"];
  //dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<UsuarioModel>();

  constructor(
    private service: RestapiService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.refresh();
    console.log("ngoninit");
 
  }

  refresh() {
    // this.myService.doSomething().subscribe((data: UsuarioModel[]) => {
    //   this.dataSource.data = data;
    // }
    this.service.getUserData().subscribe(
      (data: UsuarioModel[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        alert("EL token caduco");
      }
    );
  }

  agregarUsuario() {
    console.log("agregar usuario");
    const dialogRef = this.dialog.open(AgregarUsuariosComponent, {
      width: "300px",
    });
    // this.dialog.open(AgregarUsuariosComponent);
  }
  actualizarLista() {
    //this.refresh();
    console.log(this.usuariosLista.length);
    console.log("actualizar lista");
  }
}
