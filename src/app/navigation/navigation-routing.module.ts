import { LoginComponent } from './../components/login/login.component';
import { EditTaskComponent } from './../pages/edit-task/edit-task.component';
import { SubtaskComponent } from './../pages/subtask/subtask.component';
import { SprintPageComponent } from './../pages/sprint-page/sprint-page.component';
import { NavigationComponent } from './navigation.component';
import { MainTaskComponent } from './../pages/main-task/main-task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const navigateroutes: Routes = [
    {
        path : '',
        component : NavigationComponent,
        children :[
        {
            path: '',
            redirectTo : "main-task",
            pathMatch :'full'
        },
        {
            path : 'main-task',
            component : MainTaskComponent
        },
        {
            path : 'sprint',
            component : SprintPageComponent
        },
        {
            path : 'subtask',
            component : SubtaskComponent
        }
        // {
        //     path : 'edit-task',
        //     component : EditTaskComponent
        // },
        // {
        //     path : 'login',
        //     component : LoginComponent
        // }
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(navigateroutes)],
  exports: [RouterModule]
})

export class NavigationRoutingModule { }
