import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-active-quizzes',
  templateUrl: './display-active-quizzes.component.html',
  styleUrls: ['./display-active-quizzes.component.css']
})
export class DisplayActiveQuizzesComponent implements OnInit {

  active_quizzes:any=[];

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.getActiveQuizzes().subscribe(

      (data:any)=>{
        this.active_quizzes=data;
        console.log(this.active_quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!","Error loading data!!! ",'error');
      }

    );

  }

  printPage() {
    window.print();
  }

}
