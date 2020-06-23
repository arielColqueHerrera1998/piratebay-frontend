import { Component, OnInit } from "@angular/core";
import { SolicitudPelicula } from "../../../../models/SolicitudPelicula";
import { SolicitudPedido } from "../../../../models/SolicitudPedido";
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
  cantidadDisponible: cantidadPelicula[] = [
    { value: "1", viewValue: "1" },
    { value: "2", viewValue: "2" },
    { value: "3", viewValue: "3" },
  ];

  solicitudPelicula: SolicitudPelicula[] = [
    { idPelicula: "1", nombrePelicula: "Jojo Rabbit", cantidadSolicitada: 6 },
  ];

  solicitudPedido: SolicitudPedido = {
    idPedido: "UA23UA",
    solicitudPelicula: [
      {
        idPelicula: "1",
        nombrePelicula: "Jojo Rabbit",
        cantidadSolicitada: 6,
      },
      {
        idPelicula: "2",
        nombrePelicula: "Mujercitas",
        cantidadSolicitada: 5,
      },
    ],
    reporteProblemas: this.reporte,
    estado: "pagado",
  };
  constructor() {}

  ngOnInit() {}
}
