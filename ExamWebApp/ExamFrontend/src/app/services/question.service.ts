import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

//all questions of a particular quiz
  public getAllQuestionsOfQuiz(quizId: any) {
    return this._http.get(`${baseUrl}/question/getAllQuestionsOfQuiz/${quizId}`);
  }

  //adding a question
  public addQuestion(question:any) {
    return this._http.post(`${baseUrl}/question/addQuestion`, question)
  }

  //get single question from quiz
  public getQuestion(quesId:any) {
    return this._http.get(`${baseUrl}/question/getQuestion/${quesId}`);
  }

  //update question
  public updateQuestion(question:any) {
    return this._http.put(`${baseUrl}/question/updateQuestion`, question);
  }

  //delete question
  public deleteQuestion(quesId:any) {
    return this._http.delete(`${baseUrl}/question/deleteQuestion/${quesId}`);
  }

  //get questions for test
  public getQuestionsOfQuiz(quizId:any) {
    return this._http.get(`${baseUrl}/question/getQuestionsOfQuiz/${quizId}`);
  }

  //calling eval quiz function
  public evalQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

}
