import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

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

  deleteQuiz(quizId: any) {
    //alert(quizid);
    
    Swal.fire({
      icon:'warning',
      title:'Are you sure you want to delete this quiz?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{

      if(result.isConfirmed) {
        //delete
        this._quiz.deleteQuiz(quizId).subscribe(
          (data)=>{
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.quizid!=quizId);
            Swal.fire('Success','Quiz deleted Successfully.......','success');
          },
          (error)=>{
            Swal.fire("Error!","Error loading data!!! ",'error');
          }
        );
      }
      

    });

    

  }

}
