import { Component, OnInit } from "@angular/core";
import { SolicitudPelicula } from "../../../../models/SolicitudPelicula";
import { Combobox } from "../../../../models/Combobox";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { RestapiService } from '../../restapi.service';
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
  cantidadProducto:number;
  tamanioObjecto:number;
  reporte: string;
  comboData: Combobox[];
  aux:cantidadPelicula;

  cantidadDisponible: number[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: RestapiService) {}
  ngOnInit() {
    this.llenarCombo(5);
  }
  llenarCombo(cantidad:number) {
    this.service.getDataCombobox(cantidad).subscribe(
      (data) => {
        //console.log("data : "+data);
        this.cantidadProducto=data;
        for(let i = 1; i <= this.cantidadProducto; i++){
          this.cantidadDisponible.push(i);
        }
        //console.log("cantidad Producto :"+this.cantidadProducto);
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
}
