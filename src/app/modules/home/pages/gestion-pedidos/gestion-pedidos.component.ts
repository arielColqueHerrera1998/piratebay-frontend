import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { UsuarioModel } from "./../../../../models/usuario";
import { SolicitudPelicula } from "../../../../models/SolicitudPelicula";
import { SolicitudPedido } from "../../../../models/SolicitudPedido";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DetallesPedidoComponent } from "./../../dialog/detalles-pedido/detalles-pedido.component";
export interface PedidoPagado {
  numeroOrden: number;
  nombreCliente: string;
  fechaSolicitud: string;
  fechaPago: string;
  estado: string;
}

export interface PedidoPreparando {
  numeroOrden: number;
  nombreCliente: string;
  fechaRecepcion: string;
}

export interface PedidoPreparados {
  numeroOrden: number;
  nombreCliente: string;
  fechaPreparacion: string;
}
export interface PedidoDespachado {
  numeroOrden: number;
  nombreCliente: string;
  fechaPreparado: string;
}

// const ELEMENT_DATA: SolicitudPedido[] = [
//   {
//     numeroOrden: 1,
//     nombreCliente: "Ariel Colque Herrera",
//     fechaSolicitud: "12/12/2020",
//     fechaPago: "12/12/2020",
//     estado: "pagado",
//   },
//   {
//     numeroOrden: 2,
//     nombreCliente: "Solange Paredes Maximof",
//     fechaSolicitud: "12/12/2020",
//     fechaPago: "12/12/2020",
//     estado: "pagado",
//   },
// ];

const ELEMENT_DATA: SolicitudPedido[] = [
  {
    idPedido: "1",
    nombreCliente: "Ariel Colque Herrera",
    fechaSolicitud: "12/12/2020",
    fechaPago: "12/12/2020",
    solicitudPelicula: [
      {
        idPelicula: "1",
        nombrePelicula: "Jojo Rabbit",
        cantidadSolicitada: 6,
      },
      {
        idPelicula: "2",
        nombrePelicula: "Mujercitas",
        cantidadSolicitada: 5,
      },
    ],
    reporteProblemas: "",
    estado: "pagado",
  },
  {
    idPedido: "2",
    nombreCliente: "Nicole Espinoza Ulloa",
    fechaSolicitud: "12/12/2020",
    fechaPago: "12/12/2020",
    solicitudPelicula: [
      {
        idPelicula: "3",
        nombrePelicula: "Batman",
        cantidadSolicitada: 1,
      },
      {
        idPelicula: "4",
        nombrePelicula: "Joker",
        cantidadSolicitada: 1,
      },
    ],
    reporteProblemas: "",
    estado: "pagado",
  },
];

const ELEMENT_DATA_PREPARANDO: PedidoPreparando[] = [
  {
    numeroOrden: 1,
    nombreCliente: "Ariel Colque Herrera",
    fechaRecepcion: "12/12/2020",
  },
  {
    numeroOrden: 2,
    nombreCliente: "Solange Paredes Maximof",
    fechaRecepcion: "12/12/2020",
  },
];

const ELEMENT_DATA_PREPARADO: PedidoPreparados[] = [
  {
    numeroOrden: 1,
    nombreCliente: "Ariel Colque Herrera",
    fechaPreparacion: "12/12/2020",
  },
  {
    numeroOrden: 2,
    nombreCliente: "Solange Paredes Maximof",
    fechaPreparacion: "12/12/2020",
  },
];

const ELEMENT_DATA_DESPACHADO: PedidoDespachado[] = [
  {
    numeroOrden: 1,
    nombreCliente: "Ariel Colque Herrera",
    fechaPreparado: "12/12/2020",
  },
  {
    numeroOrden: 2,
    nombreCliente: "Solange Paredes Maximof",
    fechaPreparado: "12/12/2020",
  },
];

@Component({
  selector: "app-gestion-pedidos",
  templateUrl: "./gestion-pedidos.component.html",
  styleUrls: ["./gestion-pedidos.component.scss"],
})
export class GestionPedidosComponent implements OnInit {
  reporte: string;

  displayedColumns: string[] = [
    "numOrd",
    "nomCli",
    "fecSol",
    "fecPag",
    "detPed",
  ];

  displayedColumnsPreparando: string[] = [
    "numOrd",
    "nomCli",
    "fecRec",
    "detPed",
  ];
  displayedColumnsPreparado: string[] = [
    "numOrd",
    "nomCli",
    "fecPrep",
    "detPed",
  ];
  displayedColumnsDespachados: string[] = [
    "numOrd",
    "nomCli",
    "fecPreparado",
    "detPed",
  ];

  dataSourceTablaPendientes = ELEMENT_DATA;
  dataSourceTablaPreparando = ELEMENT_DATA_PREPARANDO;
  dataSourceTablaPreparado = ELEMENT_DATA_PREPARADO;
  dataSourceTablaDespachado = ELEMENT_DATA_DESPACHADO;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  detallePedido(pedido) {
    const dialogRef = this.dialog.open(DetallesPedidoComponent, {
      width: "600px",
      data: {
        pedidoSolicitado: pedido,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
