import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:'',
  };

  constructor(private _category:CategoryService, private _snack:MatSnackBar, private _router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {

    if(this.category.title.trim() == '' || this.category.title.trim()==null) {
      this._snack.open("Proper Title is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    if(this.category.description.trim() == '' || this.category.description.trim()==null) {
      this._snack.open("Proper Description is required !!","Okay",{
        duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
      });
      return;
    }

    //all done
    this._category.addCategory(this.category).subscribe(

      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire('Success!!', 'Category added successfully.... ', 'success').then(
          (e)=>{
          this._router.navigate(['/admin-dashboard/categories']);
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Server Error!!!','error');
      }
      
    );

  }

  ClearFields() {
    this.category={
      title:'',
      description:'',
    };
  }

}
