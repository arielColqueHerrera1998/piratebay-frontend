import { Component, OnInit } from "@angular/core";
import { DetallePedido } from "../../../../models/DetallePedido";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { RestapiService } from "../../restapi.service";
import { Console } from "console";
import * as moment from 'moment';
import { Timestamp } from 'rxjs';

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
  respCambioEstado: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RestapiService,private dialogRef:MatDialogRef<DetallesPedidoComponent>
  ) {}
  ngOnInit() {
    this.orderIdPedido = this.data.orderIdPedido;
    this.estadoPedido = this.data.estadoPedido;
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
  next() {
    for (var i = 0; i < this.selectedValue.length; i++) {
      console.log(this.selectedValue[i]);
    }
    switch (this.estadoPedido) {
      case 1:
        //console.log("pedido :" + this.orderIdPedido);
        //console.log("a preparacion");
        this.cambiarEstado(2, this.orderIdPedido);
        this.dialogRef.close();
        break;
      case 2:
        // console.log("pedido :" + this.orderIdPedido);
        // console.log("a preparados");
        var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.cambiarEstado(3, this.orderIdPedido);
        //var auxDate= new Date(this.getFecharHora.toString());
        this.cambiarconfecha(this.orderIdPedido ,this.estadoPedido );
        console.log(mysqlTimestamp);
        this.dialogRef.close();
        break;
      case 3:
        // console.log("pedido :" + this.orderIdPedido);
        // console.log("a despachados");
        this.cambiarEstado(4, this.orderIdPedido);
        this.cambiarconfecha(this.orderIdPedido ,this.estadoPedido );
        this.dialogRef.close();
        break;
      case 4:
        // console.log("pedido :" + this.orderIdPedido);
        // console.log("listo");
        this.cambiarEstado(4, this.orderIdPedido);
        console.log("Pedido en estado listo");
        this.dialogRef.close();
        break;
      default:
        // console.log("pedido :" + this.orderIdPedido);
        // console.log("error en data");
        break;
    }
  }

  cambiarEstado(estado: number, pedido: number) {
    this.service.cambiarEstadoPedido(estado, pedido).subscribe(
      (data) => {
        console.log("data : " + data);
      },
      (error) => {
        console.log("error al cambiar de estado");
      }
    );
  }

  cambiarconfecha(pedido: number,orderestado :number) {
    this.service.siguienteEstadoFecha(pedido,orderestado).subscribe(
      (data) => {
        console.log("data : " + data);
      },
      (error) => {
        console.log("error al cambiar de estado fecha");
      }
    );
  }

  // getFecharHora() {
  //   var newDate = new Date().toLocaleString();
  //   var date = newDate.split(" ");
  //   var fecha = date[0];
  //   var hora = date[1];
  //   //console.log("time : " + newDate);
  //   var auxFecha = fecha.split("/");
  //   // var nuevaFecha = auxFecha[2] + "/" + auxFecha[1] + "/" + auxFecha[0];
  //   //console.log("nueva fecha : " + nuevaFecha);
  //   var nuevoTime = (auxFecha[2] + "-0" + auxFecha[1] + "-" + auxFecha[0] + "T" + hora+".000000");
  //   //console.log("nuevo time : " + nuevoTime);
  //   return nuevoTime;
  // }
}
