import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationModule } from './navigation/navigation.module';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'navigate',
        loadChildren:() => import('./navigation/navigation.module').then(mod=>mod.NavigationModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
