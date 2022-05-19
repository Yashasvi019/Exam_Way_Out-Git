import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {

  users:any=[];

  constructor(private _user:UserService) { }

  ngOnInit(): void {

    this._user.getAllUSer().subscribe(

      (data:any)=>{
        this.users=data;
        console.log(this.users);
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
