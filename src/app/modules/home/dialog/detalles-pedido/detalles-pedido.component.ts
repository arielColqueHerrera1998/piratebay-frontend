import { Component, OnInit } from "@angular/core";
interface CantidadDisponiblePelicula {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-detalles-pedido",
  templateUrl: "./detalles-pedido.component.html",
  styleUrls: ["./detalles-pedido.component.scss"],
})
export class DetallesPedidoComponent implements OnInit {
  cantidadDisponible: CantidadDisponiblePelicula[] = [
    { value: "1", viewValue: "1" },
    { value: "2", viewValue: "2" },
    { value: "3", viewValue: "3" },
  ];
  constructor() {}

  ngOnInit() {}
}
