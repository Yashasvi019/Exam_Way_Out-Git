import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

  quizzes:any=[];

  constructor(private _route:ActivatedRoute, private _quiz:QuizService) { }

  ngOnInit(): void {

    console.log('Load all Quiz......');
    this._quiz.getActiveQuizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        alert('error loading quizzes');
      }
    );

      

  }

}
