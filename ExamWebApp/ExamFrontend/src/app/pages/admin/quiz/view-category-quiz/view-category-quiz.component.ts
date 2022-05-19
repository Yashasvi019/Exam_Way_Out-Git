import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category-quiz',
  templateUrl: './view-category-quiz.component.html',
  styleUrls: ['./view-category-quiz.component.css']
})
export class ViewCategoryQuizComponent implements OnInit {

  quizzes:any=[];
  cId:any=0;
  quizid=0;

  constructor(private _quiz:QuizService, private _route:ActivatedRoute) { }

  ngOnInit(): void {

    this._route.params.subscribe((params)=>{

    this.cId=this._route.snapshot.params.cid;

    console.log('Load category Quiz.....');
        this._quiz.getQuizzesOfCategory(this.cId).subscribe(
          (data: any)=> {
            this.quizzes=data;
            console.log(this.quizzes);
          },
          (error)=> {
            alert('error in loading quizzes');
          }
        );

      }
    );

  }

  deleteQuiz(quizId:any) {
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

