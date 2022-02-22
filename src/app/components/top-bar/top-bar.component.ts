import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {

  isLogged = false;
  subscription: Subscription = new Subscription();

  constructor(
    public AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this.AuthService.isLogged()

    this.subscription = this.AuthService.isAuthenticatedObserver().subscribe((isLogged)=>{
      this.isLogged = isLogged;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  logout () {
    this.AuthService.logout()
  }

  goAdmin () {
    this.router.navigate([`admin-properties/${sessionStorage.getItem('id')}`])
  }
}
