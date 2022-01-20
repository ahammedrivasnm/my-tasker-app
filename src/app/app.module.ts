import { TaskComponent } from './components/task/task.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridList, MatGridListModule} from '@angular/material/grid-list';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MainTaskComponent } from './pages/main-task/main-task.component';
import { SubtaskComponent } from './pages/subtask/subtask.component';
import { SprintPageComponent } from './pages/sprint-page/sprint-page.component';
import { AddNewTaskComponent } from './sub-pages/add-new-task/add-new-task.component';
import { MatInputModule} from '@angular/material/input'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule} from '@angular/material/select';
import { DeleteTaskComponent } from './sub-pages/delete-task/delete-task.component';
import { DeleteSubtaskComponent } from './sub-pages/delete-subtask/delete-subtask.component';
import { AddSprintComponent } from './sub-pages/add-sprint/add-sprint.component';
import { AddSubtaskComponent } from './sub-pages/add-subtask/add-subtask.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { DeleteSprintComponent } from './sub-pages/delete-sprint/delete-sprint.component';
import { AllSprintComponent } from './sub-pages/all-sprint/all-sprint.component';
import { AllSubtaskComponent } from './sub-pages/all-subtask/all-subtask.component';
import { UpcomingSprintComponent } from './sub-pages/upcoming-sprint/upcoming-sprint.component';
import { CurrentSprintComponent } from './pages/current-sprint/current-sprint.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PendingTaskComponent } from './sub-pages/pending-task/pending-task.component';
import { DatePipe } from '@angular/common';
import { EditTaskComponent} from './pages/edit-task/edit-task.component'


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LoginComponent,
    PendingTaskComponent,
    NavigationComponent,
    MainTaskComponent,
    SubtaskComponent,
    SprintPageComponent,
    AddNewTaskComponent,
    DeleteTaskComponent,
    DeleteSubtaskComponent,
    AddSprintComponent,
    AddSubtaskComponent,
    DeleteSprintComponent,
    AllSprintComponent,
    AllSubtaskComponent,
    UpcomingSprintComponent,
    CurrentSprintComponent,
    LoginDialogComponent,
    EditTaskComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatOptionModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  exports:[

  ],
  entryComponents:[
LoginDialogComponent
  ],
  providers: [
    DatePipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
