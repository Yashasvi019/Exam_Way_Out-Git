import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  constructor(private _http:HttpClient) { }

  //adding a question
  public addAttempt(attempt:any) {
    return this._http.post(`${baseUrl}/attempt/addAttempt`, attempt)
  }

  //getting attempt by user id
  public getAttemptByUserId(userId:any) {
    return this._http.get(`${baseUrl}/attempt/getAttemptByUserId/${userId}`)
  }

  //getting attempt by quiz id
  public getAttemptByQuizId(quizId:any) {
    return this._http.get(`${baseUrl}/attempt/getAttemptByQuizId/${quizId}`)
  }
  
  // deleting attempt
  public deleteAttempt(attemptId:any) {
    return this._http.delete(`${baseUrl}/attempt/deleteAttempt/${attemptId}`)
  }

}
