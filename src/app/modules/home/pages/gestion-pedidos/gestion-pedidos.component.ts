import { Component, OnInit,ChangeDetectorRef  } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { PedidoTablaModel } from "../../../../models/PedidoTabla";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DetallesPedidoComponent } from "./../../dialog/detalles-pedido/detalles-pedido.component";
import { RestapiService } from "../../restapi.service";
import { element } from "protractor";
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

  constructor(private dialog: MatDialog, private service: RestapiService, private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.getTablePedidos(1);
    
    this.refresh();
  }

  getTablePedidos(numero) {
    console.log("refrescando tabla pedidos");
    this.service.getTDataTable(numero).subscribe(
      (data: PedidoTablaModel[]) => {
        this.dataSourceTablaPendientes.data = data;
        this.changeDetectorRefs.detectChanges();
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

  detallePedido(pedido:number, estado:number) {
    // console.log("detalle de pedido");
    // console.log("id pedido :"+pedido);
    // console.log("estado :"+estado);
    const dialogRef = this.dialog.open(DetallesPedidoComponent, {
      width: "600px",
      data: {
        orderIdPedido : pedido,
        estadoPedido :estado,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
      console.log("lo cerraste");
      
    });
  }

  
  refresh() {
    this.getTablePedidos(1);
    this.getTablePedidosPreparando(2);
    this.getTablePedidosPreparado(3);
    this.getTablePedidosDespachado(4);
  }
}
