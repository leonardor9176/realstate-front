import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { MainComponent } from './components/main/main.component';
import { ProperyPageComponent } from './components/propery-page/propery-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminPropertiesComponent } from './pages/admin-properties/admin-properties.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'property/:id', component: ProperyPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-properties/:agent-id', component: AdminPropertiesComponent, canActivate: [AuthGuardService] },
  { path:'**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
