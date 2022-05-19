import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.css']
})
export class DisplayCategoriesComponent implements OnInit {

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
        Swal.fire("Error!","Error loading data!!! ",'error');
      }

    );

  }

  printPage() {
    window.print();
  }

}
