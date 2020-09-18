import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;
  error: boolean = false;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }
  
  goToTable(){
    this.error = false;
    if( this.user === 'enel' && this.password == 'admin2020'){
      this.router.navigate(['index']);
    } else {
      this.error = true;
    }
  }

}
