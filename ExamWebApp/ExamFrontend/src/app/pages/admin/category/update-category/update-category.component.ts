import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _category:CategoryService, private _router:Router, private _snack:MatSnackBar) { }

  cId=0;
  category:any=[];

  ngOnInit(): void {

    this.cId=this._route.snapshot.params.cid;
    // alert(this.cId);
    this._category.getCategory(this.cId).subscribe(
      (data:any)=>{
        this.category=data;
        console.log(this.category);
      },
      (error)=>{
        console.log(error);
      },
    );

  }

  //update a category
  public updateCategory() {

    //validate data
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

    this._category.updateCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire('Success!!', 'Category updated successfully.... ', 'success').then(
          (e)=>{
          this._router.navigate(['/admin-dashboard/categories'])
        });
      },
      (error)=>{
        Swal.fire('Error!!','Server Error! Category not updated!','error');
        console.log(error);
      },
    );
  }

}
