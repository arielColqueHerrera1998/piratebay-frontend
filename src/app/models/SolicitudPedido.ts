import { SolicitudPelicula } from "./SolicitudPelicula";

export class SolicitudPedidoModelo {
  idPedido: string;
  solicitudPelicula: SolicitudPelicula[];
  reporteProblemas: string;
  estado: string;
  nombreCliente: string;
  fechaSolicitud: string;
  fechaPago: string;
}
