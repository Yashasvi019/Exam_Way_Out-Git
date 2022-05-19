import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  //load all the categories
  public categories() {
    return this._http.get(`${baseUrl}/category/getCategories`);
  }

  //add new category
  public addCategory(category:any) {
    return this._http.post(`${baseUrl}/category/addCategory`, category);
  }

  //delete a category
  public deleteCategory(cId:any) {
    return this._http.delete(`${baseUrl}/category/deleteCategory/${cId}`);
  }

  //get single category
  public getCategory(cId: any) {
    return this._http.get(`${baseUrl}/category/getCategory/${cId}`);
  }

  //update category
  public updateCategory(category:any) {
    return this._http.put(`${baseUrl}/category/updateCategory`, category);
  }

}
