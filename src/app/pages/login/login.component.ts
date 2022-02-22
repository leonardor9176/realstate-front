import { Component, OnInit } from '@angular/core';
import { AgentsService } from 'src/app/services/agents/agents.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: string = ''
  public password: string = ''
  public loading: boolean = false
  public faSpinner = faSpinner

  constructor(
    private AgentsService: AgentsService,
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.AuthService.isLogged()) {
      this.router.navigate([`admin-properties/${sessionStorage.getItem('id')}`])
    }
  }

  login() {
    if (this.user && this.password) {
      this.loading = true
      this.AuthService.login(this.user, this.password)
        .then(res => {
          if (res.status) {
            this.router.navigate([`admin-properties/${res.id}`])
          }
          else {
            console.log(res.error)
          }
        })
      this.loading = false
    }
  }
}
