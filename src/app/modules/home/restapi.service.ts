import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsuarioModel } from "./../../models/usuario";
import { PedidoTablaModel } from "./../../models/PedidoTabla";
import { DetallePedido } from "./../../models/DetallePedido";
import { Combobox } from 'src/app/models/Combobox';
import { Timestamp } from 'rxjs';
@Injectable({
  providedIn: "root",
})
export class RestapiService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post("http://localhost:8008/api/v1/security/login", {
      username: username,
      password: password,
    });
  }

  public refresh(refreshToken: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post("http://localhost:8008/api/v1/security/refresh", {
      refreshToken: refreshToken,
    });
  }

  public getUserData() {
    var tokenUser = localStorage.getItem("token");
    //console.log("tkn get user data: "+tokenUser);
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + tokenUser,
    });
    return this.http.get<UsuarioModel[]>("http://localhost:8008/api/v1/user", {
      headers: reqHeader,
    });
  }

  public removeTokens(){
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  }

  public getTDataTable(estado:number) {
    var data={
      "estado":estado
    }
    var tokenUser = localStorage.getItem("token");
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + tokenUser,
      
    });
    return this.http.post<PedidoTablaModel[]>("http://localhost:8008/api/v1/ordersTable",data,{
      headers: reqHeader,
    });
  }

  public getDataCombobox(orderId:number) {
    var data=orderId;
    
    var tokenUser = localStorage.getItem("token");
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + tokenUser,
    });
    return this.http.post<number>("http://localhost:8008/api/v1/cantidadProducto",data,{
      headers: reqHeader,
    });
  }


  public getDetallesPedido(orderId:number) {
    var data=orderId;
    var tokenUser = localStorage.getItem("token");
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + tokenUser,
    });
    return this.http.post<DetallePedido[]>("http://localhost:8008/api/v1/orders",data,{
      headers: reqHeader,
    });
  }

  public cambiarEstadoPedido(estado:number,orderId:number) {
    var data={
      "order_estado":estado,
      "order_id":orderId
    }
    var tokenUser = localStorage.getItem("token");
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + tokenUser,
    });
    return this.http.post<number>("http://localhost:8008/api/v1/cambiarEstado",data,{
      headers: reqHeader,
    });
  }


  public siguienteEstadoFecha(orderId:number,estado:number) {
    var data={
      "order_id": orderId,
      "estado_producto": estado
    }
    var tokenUser = localStorage.getItem("token");
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + tokenUser,
    });
    return this.http.post<number>("http://localhost:8008/api/v1/cambiarFecha",data,{
      headers: reqHeader,
    });
  }

}
