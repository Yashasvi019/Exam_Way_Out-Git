import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _question:QuestionService, private _router:Router, private _snack:MatSnackBar) { }

  public Editor = ClassicEditor;
  
  quesId=0;
  question:any=[];

  quizid:any=0;
  quiztitle:any='';

  ngOnInit(): void {

    this.quesId=this._route.snapshot.params.quesid;
    //alert(this.quesId);
    this._question.getQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(this.question);
        this.quizid=this.question.quiz.quizid;
        this.quiztitle=this.question.quiz.title;
      },
      (error)=>{
        console.log(error);
      },
    );

  }

  //update on form submit
  public updateQuestion() {
    
    //validate data
    if(this.question.content.trim() == '' || this.question.content.trim()==null) {
      this._snack.open("Proper Content of question is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.question.option1.trim() == '' || this.question.option1.trim()==null) {
      this._snack.open("Proper option 1 is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.question.option2.trim() == '' || this.question.option2.trim()==null) {
      this._snack.open("Proper option 2 is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.question.option3.trim() == '' || this.question.option3.trim()==null) {
      this._snack.open("Proper option 3 is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.question.option4.trim() == '' || this.question.option4.trim()==null) {
      this._snack.open("Proper option 4 is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.question.answer.trim() == '' || this.question.answer.trim()==null) {
      this._snack.open("Proper answer is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    //validation done

    //update
    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success!!', 'Question updated successfully.... ', 'success').then(
          (e)=>{
          this._router.navigate(['/admin-dashboard/view-questions/'+this.quizid+'/'+this.quiztitle])
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Server Error! Error in updating question!','error');
      },
    );

  }


}
