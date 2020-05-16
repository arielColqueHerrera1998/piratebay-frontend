import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RestapiService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //"Authorization": " Basic " + btoa(username + ":" + password)
      Authorization: " Basic " + btoa("username" + ":" + "jperez"),
    });
    return this.http.post("http://localhost:8008/api/v1/security/login", {
      username: username,
      password: password,
      //responseType: "text" as "json",
    });
    console.log("here3");
  }
}
