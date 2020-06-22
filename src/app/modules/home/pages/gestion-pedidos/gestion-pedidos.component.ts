import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { UsuarioModel } from "./../../../../models/usuario";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DetallesPedidoComponent } from "./../../dialog/detalles-pedido/detalles-pedido.component";
export interface PedidoPagado {
  numeroOrden: number;
  nombreCliente: string;
  nombrePelicula: string;
  fechaSolicitud: string;
  fechaPago: string;
}
const ELEMENT_DATA: PedidoPagado[] = [
  {
    numeroOrden: 1,
    nombreCliente: "Ariel Colque Herrera",
    nombrePelicula: "Toy Story",
    fechaSolicitud: "12/12/2020",
    fechaPago: "12/12/2020",
  },
  {
    numeroOrden: 2,
    nombreCliente: "Solange Paredes Maximof",
    nombrePelicula: "Toy Story",
    fechaSolicitud: "12/12/2020",
    fechaPago: "12/12/2020",
  },
];

@Component({
  selector: "app-gestion-pedidos",
  templateUrl: "./gestion-pedidos.component.html",
  styleUrls: ["./gestion-pedidos.component.scss"],
})
export class GestionPedidosComponent implements OnInit {
  // displayedColumns: string[] = ["id", "nombre", "correo", "telefono", "estado"];
  // dataSource = new MatTableDataSource<UsuarioModel>();

  displayedColumns: string[] = [
    "numOrd",
    "nomCli",
    "nomPel",
    "fecSol",
    "fecPag",
    "detPed",
  ];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  detallePedidoPagado() {
    const dialogRef = this.dialog.open(DetallesPedidoComponent, {
      width: "600px",
    });
  }
}
