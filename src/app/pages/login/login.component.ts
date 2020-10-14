import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;
  error: boolean = false;
  estaAutenticado: boolean = false;

  constructor( private router: Router, private auth: AuthService ) { }

  ngOnInit(): void {
  }
  
  goToTable(){
    this.error = false;
    if( this.user === 'enel' && this.password == 'admin2020'){
      this.auth.autenticacionCorrecta();
      this.router.navigate(['index']);
    } else {
      this.error = true;
    }
  }

}
