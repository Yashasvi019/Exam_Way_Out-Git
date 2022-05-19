import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId=0;
  quizTitle="";
  questions:any=[];

  constructor( private _route: ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {

    this.quizId=this._route.snapshot.params.quizid;
    this.quizTitle=this._route.snapshot.params.quiztitle;
    // console.log(this.quizId);
    // console.log(this.quizTitle);
    this._question.getAllQuestionsOfQuiz(this.quizId).subscribe(
      (data)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error);
      },
    );

  }

  //delete question
  deleteQuestion(quesId: any) {
    // alert(quesId);
    Swal.fire({
      icon:'warning',
      title:'Are you sure you want to delete this question?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{

      if(result.isConfirmed) {
        //delete
        this._question.deleteQuestion(quesId).subscribe(
          (data)=>{
            Swal.fire('Success','Question deleted Successfully.......','success');
            this.questions=this.questions.filter((question:any)=>question.quesid!=quesId);
          },
          (error)=>{
            Swal.fire("Error!","Error in deleting this question!!! ",'error');
            console.log(error);
            
          }
        );
      }
      

    });
  }

}
