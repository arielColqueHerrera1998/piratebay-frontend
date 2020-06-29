import { Component, OnInit } from "@angular/core";
import { Combobox } from "../../../../models/Combobox";
import { DetallePedido } from "../../../../models/DetallePedido";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { RestapiService } from '../../restapi.service';

@Component({
  selector: "app-detalles-pedido",
  templateUrl: "./detalles-pedido.component.html",
  styleUrls: ["./detalles-pedido.component.scss"],
})
export class DetallesPedidoComponent implements OnInit {
  cantidadProducto:number;
  detallePedido:DetallePedido[];
  reporte: string;
  cantidadDisponible: number[]=[];
  orderId : number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private service: RestapiService) {}
  ngOnInit() {
    this.orderId=this.data;
    this.obtenerDetalles(this.orderId);
    this.cantidadDisponible=[];
    // this.llenarCombo(5);
  }
  llenarCombo(cantidad:number) {
    this.cantidadDisponible=[];
    this.service.getDataCombobox(cantidad).subscribe(
      (data) => {
        this.cantidadProducto=data;
        for(let i = 1; i <= this.cantidadProducto; i++){
          this.cantidadDisponible.push(i);
        }
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
  obtenerDetalles(orderId:number){
    this.service.getDetallesPedido(orderId).subscribe(
      (data) => {
        //console.log(data);
        this.detallePedido=data;
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
}
