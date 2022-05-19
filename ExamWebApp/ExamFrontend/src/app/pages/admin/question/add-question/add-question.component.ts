import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

quizId=0;
quizTitle='';
question:any={
  quiz:{},
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:'',
};

  constructor(private _route:ActivatedRoute, private _question: QuestionService, private _snack:MatSnackBar, private _router:Router) { }

  ngOnInit(): void {

    this.quizId=this._route.snapshot.params.quizid;
    this.quizTitle=this._route.snapshot.params.quiztitle;
    // console.log(this.quizId);
    this.question.quiz['quizid']=this.quizId;

  }

  //adding the question
  formSubmit() {
    //alert('ok');
    //validating the data
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

    //after validation
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        this.question={
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          answer:'',
        };
        Swal.fire('Success!!', 'Question added successfully.... ', 'success').then(
          (e)=>{
          this._router.navigate(['/admin-dashboard/view-questions/'+this.quizId+'/'+this.quizTitle])
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Server Error!!!','error');
      },

    );

  }

  ClearFields() {
    this.question={
      quiz:{},
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
    };
  }

}
