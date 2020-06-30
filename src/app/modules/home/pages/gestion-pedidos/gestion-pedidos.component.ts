import { Component, OnInit,ChangeDetectorRef  } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { PedidoTablaModel } from "../../../../models/PedidoTabla";
import { Router, ActivatedRoute } from "@angular/router";
import * as jwt_decode from "jwt-decode";

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
  nuevoTokenUsuario: string;
  nuevoTokenRefresh: string;
  mostrarGestion: boolean = false;

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

  constructor(private dialog: MatDialog, private service: RestapiService, private changeDetectorRefs: ChangeDetectorRef,    private router: Router) {}

  ngOnInit() {

    var x = localStorage.getItem("token");
    // console.log("token actual:" + x);
    if (x == null) {
      this.router.navigate(["/"]);
      alert("No se tienen tokens");
    } else {
      this.refreshTokens();
    }
  }
  
  // ----- tablas de pedido -----

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

  // ----- #tablas de pedido -----
  //-------detalle de pedido--------

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
      this.refreshTable();
      console.log("lo cerraste");
      
    });
  }
   //-------#detalle de pedido--------

   //-------refrescar tokens--------

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
          //console.log("key gestion: " + key + ",  value: " + data[key]);
        }
        let tokenInfo = this.getDecodedAccessToken(this.nuevoTokenUsuario); // decode token
        let expireDate = tokenInfo.exp; // get token expiration dateTime
        //console.log(tokenInfo);

        for (let keyInfo in tokenInfo) {
          if (keyInfo == "features") {
            var informacionToken = tokenInfo[keyInfo];
            for (var i = 0; i < informacionToken.length; i++) {
              if (informacionToken[i] == "PAGE_USER_MANAGEMENT") {
                console.log("page user management logged");
                this.mostrarGestion = true;
              } else {
              }
            }
          }
        }
        localStorage.setItem("token", this.nuevoTokenUsuario);
        localStorage.setItem("refresh", this.nuevoTokenRefresh);
        //console.log("Tokens refrescados en gestion ");
        this.refreshTable();
      },
      (error) => {
        console.log("Timeout token refresh");
        this.service.removeTokens();
        this.router.navigate(["/"]);
      }
    );
  }

     //-------#refrescar tokens--------



  // refrescar tablas con cada movimiento
  refreshTable() {
    this.getTablePedidos(1);
    this.getTablePedidosPreparando(2);
    this.getTablePedidosPreparado(3);
    this.getTablePedidosDespachado(4);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
