import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsuarioModel } from "./../../models/usuario";
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

  
}
