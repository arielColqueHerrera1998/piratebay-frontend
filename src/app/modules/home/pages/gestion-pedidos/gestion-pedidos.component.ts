import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { SolicitudPedidoModelo } from "../../../../models/SolicitudPedido";
import { PedidoTablaModel } from "../../../../models/PedidoTabla";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DetallesPedidoComponent } from "./../../dialog/detalles-pedido/detalles-pedido.component";
import { RestapiService } from "../../restapi.service";
import { element } from 'protractor';
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
//     idPedido: "1",
//     nombreCliente: "Ariel Colque Herrera",
//     fechaSolicitud: "13/12/2020",
//     fechaPago: "13/12/2020",
//     solicitudPelicula: [
//       {
//         idPelicula: "1",
//         nombrePelicula: "Jojo Rabbit",
//         cantidadSolicitada: 6,
//       },
//       {
//         idPelicula: "2",
//         nombrePelicula: "Mujercitas",
//         cantidadSolicitada: 5,
//       },
//     ],
//     reporteProblemas: "",
//     estado: "pagado",
//   },
//   {
//     idPedido: "2",
//     nombreCliente: "Nicole Espinoza Ulloa",
//     fechaSolicitud: "12/12/2020",
//     fechaPago: "12/12/2020",
//     solicitudPelicula: [
//       {
//         idPelicula: "3",
//         nombrePelicula: "Batman",
//         cantidadSolicitada: 1,
//       },
//     ],
//     reporteProblemas: "",
//     estado: "pagado",
//   },
//   {
//     idPedido: "3",
//     nombreCliente: "Nicole Espinoza Ulloa",
//     fechaSolicitud: "12/12/2020",
//     fechaPago: "12/12/2020",
//     solicitudPelicula: [
//       {
//         idPelicula: "5",
//         nombrePelicula: "Robin",
//         cantidadSolicitada: 1,
//       },
//     ],
//     reporteProblemas: "",
//     estado: "pagado",
//   },
// ];




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
  pedidoTabla: PedidoTablaModel[];

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


  dataSourceTablaPendientes = new MatTableDataSource<PedidoTablaModel>();
  dataSourceTablaPreparando = new MatTableDataSource<PedidoTablaModel>();
  dataSourceTablaPreparado = new MatTableDataSource<PedidoTablaModel>();
  dataSourceTablaDespachado = new MatTableDataSource<PedidoTablaModel>();


  constructor(private dialog: MatDialog, private service: RestapiService) {}

  ngOnInit() {
    this.getTablePedidos(1);
    this.getTablePedidosPreparando(2);
    this.getTablePedidosPreparado(3);
    this.getTablePedidosDespachado(4);
  }

  detallePedido(pedido) {
    const dialogRef = this.dialog.open(DetallesPedidoComponent, {
      width: "600px",
      data: {
        pedidoSolicitado: pedido,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getTablePedidos(numero) {
    console.log("refrescando tabla pedidos");
    this.service.getTDataTable(numero).subscribe(
      (data: PedidoTablaModel[]) => {
        this.dataSourceTablaPendientes.data = data;
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
  getTablePedidosPreparando(numero) {
    this.service.getTDataTable(numero).subscribe(
      (data: PedidoTablaModel[]) => {
        this.dataSourceTablaPreparando.data = data;
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
  getTablePedidosPreparado(numero) {
    this.service.getTDataTable(numero).subscribe(
      (data: PedidoTablaModel[]) => {
        this.dataSourceTablaPreparado.data = data;
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
  getTablePedidosDespachado(numero) {
    this.service.getTDataTable(numero).subscribe(
      (data: PedidoTablaModel[]) => {
        this.dataSourceTablaDespachado.data = data;
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
}
