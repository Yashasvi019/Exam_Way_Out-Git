import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

categories:any=[];

  constructor(private _category:CategoryService) { }

  ngOnInit(): void {

this._category.categories().subscribe(
(data:any)=>{
  this.categories=data;
  console.log(this.categories);
},
(error)=>{
  console.log(error);
  Swal.fire("Error!","Something went wrong!!!",'error');
}
);

  }

//delete category
deleteCategory(cId:any) {

  // alert(cId);

  Swal.fire({
    icon:'warning',
    title:'Are you sure you want to delete this category?',
    confirmButtonText:'Delete',
    showCancelButton:true,
  }).then((result)=>{

    if(result.isConfirmed) {
      //delete
      this._category.deleteCategory(cId).subscribe(
        (dataa)=>{
          this.categories=this.categories.filter((category:any)=>category.cid!=cId);
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
