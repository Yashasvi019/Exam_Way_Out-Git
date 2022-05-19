import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

cId: any=0;
quizzes:any=[];

  constructor(private _route:ActivatedRoute, private _quiz:QuizService) { }

  ngOnInit(): void {

    this._route.params.subscribe((params)=>{

      this.cId=this._route.snapshot.params.cid;
      // console.log(this.cId);

      if(this.cId==0) {

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

      }else {
        console.log('Load category Quiz.....');
        this._quiz.getActiveQuizzesOfCategory(this.cId).subscribe(
          (data: any)=> {
            this.quizzes=data;
            console.log(this.quizzes);
          },
          (error)=> {
            alert('error in loading quizzes');
          }
        );
      }
    
    });

  }

}
