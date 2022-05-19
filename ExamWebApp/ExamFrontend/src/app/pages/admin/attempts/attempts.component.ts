import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from 'src/app/services/attempt.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.css']
})
export class AttemptsComponent implements OnInit {

  quizId:any=0;
  quiz:any=[];

  attempts:any=[];

  constructor(private _attempt:AttemptService,private _route:ActivatedRoute, private _quiz:QuizService) { }

  ngOnInit(): void {

    this.quizId=this._route.snapshot.params.quizid;

    this._attempt.getAttemptByQuizId(this.quizId).subscribe(
      (data:any)=>{
        this.attempts=data;
        console.log(data);
        console.log('get attempt by quiz');
      },
      (error)=>{
        console.log(error);
        alert('error in getting attempts!!');
      }
    );

    this._quiz.getQuiz(this.quizId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        console.log('error in getting quiz');
      }
    )

  }

}
