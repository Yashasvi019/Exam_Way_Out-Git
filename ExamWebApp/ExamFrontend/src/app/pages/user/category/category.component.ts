import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:any=[];

  constructor(private _category:CategoryService, private _snack:MatSnackBar) { }

  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        this._snack.open('Error in loading categories!!!',"Okay",{
          duration:5000,verticalPosition:'bottom',horizontalPosition:'center'
        });
        console.log(error);
      }
    );


  }

}
