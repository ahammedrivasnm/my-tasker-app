import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTaskComponent } from './../../pages/main-task/main-task.component';
import { SubtaskComponent } from './../../pages/subtask/subtask.component';
import { SprintPageComponent } from './../../pages/sprint-page/sprint-page.component';
import { CurrentSprintComponent } from 'src/app/pages/current-sprint/current-sprint.component';

const routes: Routes = [
  {path: 'main-task', component: MainTaskComponent},
  {path: 'subtask', component: SubtaskComponent},
  {path: 'sprint', component: SprintPageComponent},
  {path: 'current-sprint', component:CurrentSprintComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachRoutingModule { }
