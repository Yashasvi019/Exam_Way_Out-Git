import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-quizzes',
  templateUrl: './display-quizzes.component.html',
  styleUrls: ['./display-quizzes.component.css']
})
export class DisplayQuizzesComponent implements OnInit {

  quizzes:any=[];

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(

      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
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
