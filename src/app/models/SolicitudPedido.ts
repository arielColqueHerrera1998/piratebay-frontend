import { SolicitudPelicula } from "./SolicitudPelicula";

export class SolicitudPedido {
  idPedido: string;
  solicitudPelicula: SolicitudPelicula[];
  reporteProblemas: string;
  estado: string;
  nombreCliente: string;
  fechaSolicitud: string;
  fechaPago: string;
}
