import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsuarioModel } from "./../../models/usuario";
@Injectable({
  providedIn: "root",
})
export class RestapiService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //"Authorization": " Basic " + btoa(username + ":" + password)
      //Authorization: " Basic " + btoa("username" + ":" + "password"),
    });
    return this.http.post(
      "http://localhost:8008/api/v1/security/login",
      {
        username: username,
        password: password,
      },
    );
  }

  public getUserData() {

    var tokenUser = localStorage.getItem("token");
    //console.log("tkn : "+accessTokenObj);
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "bearer "+tokenUser,
    });

    return this.http.get<UsuarioModel[]>("http://localhost:8008/api/v1/user", {
      headers: reqHeader,
    });
  }
  // public generateToken(request) {
  //   return this.http.post(
  //     "http://localhost:8008/api/v1/security/login",
  //     request,
  //     {
  //       responseType: "text" as "json",
  //     }
  //   );
  // }
  // public welcome(token) {
  //   let tokenStr = "bearer " + token;
  //   const headers = new HttpHeaders().set("Authorization", tokenStr);
  //   return this.http.get("http://localhost:8008/", {
  //     headers,
  //     responseType: "text" as "json",
  //   });
  // }
}
