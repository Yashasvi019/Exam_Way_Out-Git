import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  //add user
  public addUser(user:any){
    return this._http.post(`${baseUrl}/user/register`,user)
  }

  //update user
  public updateUser(user:any) {
    return this._http.put(`${baseUrl}/user/updateUser`, user)
  }

  //get all users
  public getAllUSer(){
    return this._http.get(`${baseUrl}/user/getAllUser`);
  }

}
