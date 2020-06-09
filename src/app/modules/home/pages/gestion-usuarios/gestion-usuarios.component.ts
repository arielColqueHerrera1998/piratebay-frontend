import { Component, OnInit } from "@angular/core";

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
  constructor() {}

  ngOnInit() {}
}
