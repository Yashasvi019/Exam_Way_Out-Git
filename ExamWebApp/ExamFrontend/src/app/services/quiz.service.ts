import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  //getting all quizzes
  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/getQuizzes`);
  }

  //adding a quiz
  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/addQuiz`, quiz);
  }

  //delete a quiz
  public deleteQuiz(quizId:any) {
    return this._http.delete(`${baseUrl}/quiz/deleteQuiz/${quizId}`);
  }

  //get single quiz
  public getQuiz(quizId: any) {
    return this._http.get(`${baseUrl}/quiz/getQuiz/${quizId}`);
  }

  //update quiz
  public updateQuiz(quiz:any) {
    return this._http.put(`${baseUrl}/quiz/updateQuiz`, quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cId:any) {
    return this._http.get(`${baseUrl}/quiz/getQuizzesOfCategory/${cId}`);
  }

  //get all active quizzes
  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/getActiveQuizzes`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cId:any) {
    return this._http.get(`${baseUrl}/quiz/getActiveQuizzesOfCategory/${cId}`);
  }

}
