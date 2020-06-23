import { Component, OnInit } from "@angular/core";
import { SolicitudPelicula } from "../../../../models/SolicitudPelicula";
import { SolicitudPedido } from "../../../../models/SolicitudPedido";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
interface cantidadPelicula {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-detalles-pedido",
  templateUrl: "./detalles-pedido.component.html",
  styleUrls: ["./detalles-pedido.component.scss"],
})
export class DetallesPedidoComponent implements OnInit {
  reporte: string;
  solicitudPedidoObjeto: SolicitudPedido;

  cantidadDisponible: cantidadPelicula[] = [
    { value: "1", viewValue: "1" },
    { value: "2", viewValue: "2" },
    { value: "3", viewValue: "3" },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    //console.log("data :" + this.data);
    this.solicitudPedidoObjeto = this.data.pedidoSolicitado;
  }
}
