import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { AgentsService } from '../agents/agents.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged = new Subject<boolean>();

  constructor(
    public jwtHelper: JwtHelperService,
    private AgentsService: AgentsService,
    private router: Router
  ) { }

  // login (user: string, password: string){
  //   const res = this.AgentsService.login(user, password)
  //   console.log('2 ', res)

  // }
  async login(user: string, password: string) {
    try {
      const promise = await new Promise<any>((resolve, reject) => {
        this.AgentsService.login(user, password).subscribe((res: any) => {
          if (res.status) {
            resolve(res)
          }
          else {
            reject(res.error)
          }
        })
      })
      sessionStorage.setItem('id', promise.data.agent.id)
      sessionStorage.setItem('token', promise.data.agent.token)
      this._isLogged.next(this.isLogged())
      return {
        status: promise.status,
        id: promise.data.agent.id
      }
    }
    catch (error) {
      // console.log('Error al validar el usuario.', error)
      return {
        status: false,
        error: `error al validar al usuario: ${error}`
      }
    }
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token') as string
    return !this.jwtHelper.isTokenExpired(token)
  }

  isAuthenticatedObserver(): Observable<boolean> {
    return this._isLogged.asObservable()
  }

  isLogged() {
    return sessionStorage.getItem('token') ? true : false
  }

  logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    this._isLogged.next(this.isAuthenticated())
    this.router.navigate([''])
  }

}
