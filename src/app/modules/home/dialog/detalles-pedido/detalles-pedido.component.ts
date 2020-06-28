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
  reporte: string;
  //solicitudPedidoObjeto: SolicitudPedido;

  cantidadDisponible: cantidadPelicula[] = [
    { value: "1", viewValue: "1" },
    { value: "2", viewValue: "2" },
    { value: "3", viewValue: "3" },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: RestapiService) {}
  dataCombo:Array<Combobox>;
  ngOnInit() {
    this.llenarCombo(2);
    //this.solicitudPedidoObjeto = this.data.pedidoSolicitado;
  }
  llenarCombo(cantidad:number) {
    this.service.getDataCombobox(cantidad).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log("error con la tabla");
      }
    );
  }
}
