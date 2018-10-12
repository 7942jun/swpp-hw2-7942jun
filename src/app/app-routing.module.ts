import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ArticlesComponent } from './articles/articles.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign_in', pathMatch: 'full'},
  { path: 'sign_in', component: SignInComponent },
  { path: 'articles', canActivate: [AuthGuard], component: ArticlesComponent},
  { path: 'articles/create', canActivate: [AuthGuard], component: CreateComponent },
  { path: 'articles/:id', canActivate: [AuthGuard], component: DetailComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
