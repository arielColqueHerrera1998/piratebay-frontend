import { Component, OnInit } from "@angular/core";
import { DetallePedido } from "../../../../models/DetallePedido";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { RestapiService } from "../../restapi.service";

@Component({
  selector: "app-detalles-pedido",
  templateUrl: "./detalles-pedido.component.html",
  styleUrls: ["./detalles-pedido.component.scss"],
})
export class DetallesPedidoComponent implements OnInit {
  cantidadProducto: number;
  detallePedido: DetallePedido[];
  reporte: string;
  cantidadDisponible: number[] = [];
  orderIdPedido: number;
  estadoPedido: number;
  selectedValue: string[] = [];
  botonNext: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RestapiService
  ) {}
  ngOnInit() {
    this.orderIdPedido=this.data.orderIdPedido;
    this.estadoPedido=this.data.estadoPedido;
    // console.log("order  : " + this.orderIdPedido);
    // console.log("estado : " + this.estadoPedido);
    this.obtenerDetalles(this.orderIdPedido);
  }
  llenarCombo(cantidad: number) {
    this.cantidadDisponible = [];
    this.service.getDataCombobox(cantidad).subscribe(
      (data) => {
        this.cantidadProducto = data;
        for (let i = 1; i <= this.cantidadProducto; i++) {
          this.cantidadDisponible.push(i);
        }
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
  obtenerDetalles(orderId: number) {
    switch (this.estadoPedido) {
      case 1:
        this.botonNext = "A preparacion";
        break;
      case 2:
        this.botonNext = "A preparados";
        break;
      case 3:
        this.botonNext = "A despachados";
        break;
      case 4:
        this.botonNext = "Listo";
        break;
      default:
        this.botonNext = "Error en data";
        break;
    }
    this.service.getDetallesPedido(orderId).subscribe(
      (data) => {
        //console.log(data);
        this.detallePedido = data;
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
  aPreparacion() {
    for (var i = 0; i < this.selectedValue.length; i++) {
      console.log(this.selectedValue[i]);
    }
  }
}
