import { formatDate, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from 'src/app/services/attempt.service';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {

  userId:any;
  user:any=[];
  quizId:any=0;
  questions:any=[];

  marksSingle:any=0;
  totalMarks:any=0;
  marksGot:any=0;
  totalQuestions:any=0;
  attempted:any=0;
  unattempted:any=0;
  correctAnswers:any=0;
  incorrectAnswers:any=0;
  isSubmit=false;
  timer:any;

  now:any;
  date:any='';
  attempt ={
      dateTime:'',
      totalMarks:0,
      marksGot:0,
      totalQuestions:0,
      attemptedAnswers:0,
      unattemptedAnswers:0,
      correctAnswers:0,
      incorrectAnswers:0,
      user:{
          id:0,
        },
      quiz:{
          quizid:0,
        }
      };

  constructor(private locationStrategy:LocationStrategy, private _route:ActivatedRoute, 
    private _question:QuestionService, private _login:LoginService,private _attempt:AttemptService) { }

  ngOnInit(): void {

    this.preventBackButton();
    this.quizId=this._route.snapshot.params.quizid;
    console.log(this.quizId);
    this.loadQuestions();

    this.user=this._login.getCurrentUser().subscribe(
      (data:any)=>{
        this.user=data;
        console.log(data);
        this.userId=this.user.id;
      },
      (error)=>{
        console.log(error);
        alert('error in getting current user!!');
      }
    )
    
  }

  loadQuestions() {
    this._question.getQuestionsOfQuiz(this.quizId).subscribe(
      (data:any)=> {
        this.questions=data;
        this.timer=this.questions.length*1*60+2*60;
        // this.questions.forEach(
          // (q:any)=> {
          //   q['newAnwser']=null;
          // },
          // );
        console.log(this.questions);
        this.startTimer();
    },
    (error)=> {
      console.log(error);
      Swal.fire('Error!!','Error in loading questions of Quiz...','error');
    });
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationStrategy.onPopState(()=> {
      history.pushState(null,location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Don't Submit`,
      icon:'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      } else if (result.isDenied) {
        Swal.fire('Quiz will not submit now.', '', 'info')
      }
    });
  }

  add_attempt() {
    this._attempt.addAttempt(this.attempt).subscribe(
      (data:any)=>{
        this.attempt = {
            dateTime:'',
            totalMarks:0,
            marksGot:0,
            totalQuestions:0,
            attemptedAnswers:0,
            unattemptedAnswers:0,
            correctAnswers:0,
            incorrectAnswers:0,
            user:{
                id:0,
              },
            quiz:{
                quizid:0,
              }
          };
        console.log('Successfully added your marks!!');
      },
      (error)=>{
        console.log('Not added attempt!!');
        console.log(error);
      }
    )
  }

  evalQuiz() {
    //call to server to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.totalMarks=data.totalMarks;
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.totalQuestions=data.totalQuestions;
        this.attempted=data.attempted;
        this.unattempted=data.unattempted;
        this.correctAnswers=data.correctAnswers;
        this.incorrectAnswers=data.incorrectAnswers;
        this.isSubmit=true;

        this.now = new Date();
        this.date = formatDate(this.now, 'dd-MM-yyyy hh:mm:ss a','en-US');

        this.attempt = {
            dateTime:this.date,
            totalMarks:this.totalMarks,
            marksGot:this.marksGot,
            totalQuestions:this.totalQuestions,
            attemptedAnswers:this.attempted,
            unattemptedAnswers:this.unattempted,
            correctAnswers:this.correctAnswers,
            incorrectAnswers:this.incorrectAnswers,
            user:{
                id:this.userId,
              },
            quiz:{
                quizid:this.quizId,
              }
          };
        this.add_attempt();

      },
      (error)=>{
        console.log(error); 
      }
    );

    // this.isSubmit=true;
    // this.questions.forEach(
    //   (q:any) => {
    //   if(q.newAnswer==q.answer) {
    //     this.correctAnswers++;
    //     this.marksSingle=(this.questions[0].quiz.maxMarks)/(this.questions.length);
    //     this.marksGot+=this.marksSingle;
    //   }        
    //   if(q.newAnswer != null) {
    //     this.attempted++;
    //   }
    // });
    // console.log("Single Question Marks: "+this.marksSingle);
    // console.log('Correct Answers: '+this.correctAnswers);
    // console.log('Marks Got: '+this.marksGot);
    // console.log('Attempted: '+this.attempted);
    // console.log(this.questions);
  }

  startTimer() {
    let t=window.setInterval(
      ()=> {
        if(this.timer<=0) {
          this.evalQuiz();
          clearInterval(t);
        }
        else {
          this.timer--;
        }
      }, 1000);
  }

  getFormattedTime() {
    let hh=Math.floor(this.timer/(60*60));
    let mm=Math.floor((this.timer-hh*60*60)/60);
    let ss=this.timer-(hh*60*60)-(mm*60);

    // let mm=Math.floor(this.timer/60);
    // let ss=this.timer-mm*60;
    return `${hh} hh : ${mm} mm : ${ss} ss`;
  }

  printPage() {
    window.print();
  }

}

