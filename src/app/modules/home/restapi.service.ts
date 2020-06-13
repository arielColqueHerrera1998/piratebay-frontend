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
      Authorization: " Basic " + btoa("username" + ":" + "password"),
    });
    return this.http.post("http://localhost:8008/api/v1/security/login", {
      username: username,
      password: password,
    });
  }

  public getUserData() {
    const reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmZWF0dXJlcyI6WyJCVVRUT05fREVMRVRFX1VTRVIiLCJQQUdFX1VTRVJfTUFOQUdFTUVOVCIsIlBST0RVQ1RfTUFOQUdNRU5UIl0sInN1YiI6IjIiLCJpc3MiOiJQaXJhdGViYXkiLCJ0eXBlIjoiQVVUSE4iLCJleHAiOjE1OTIwODE4NDZ9.65EGCVQO6XC8sUrW9G2_L-MxJ9fQbwuqXbt8rpmfJBo",
    });

    return this.http.get<UsuarioModel[]>("http://localhost:8008/api/v1/user", {
      headers: reqHeader,
    });
  }
}
