import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId:any=0;
  quiz:any=[];

  constructor(private _route:ActivatedRoute, private _quiz:QuizService,private _router:Router) { }

  ngOnInit(): void {

    this.quizId=this._route.snapshot.params.quizid;
    console.log(this.quizId);

    this._quiz.getQuiz(this.quizId).subscribe(
      (data)=>{
        this.quiz=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        alert('error in loading quiz data');
      }
    );
    

  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the Quiz?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
      icon:'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/quiz/start/'+this.quizId]);
      } else if (result.isDenied) {
        Swal.fire('Quiz will not start now.', '', 'info')
      }
    });
  }

}
