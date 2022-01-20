import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { ParamsApiService } from 'src/app/services/params-api.service';

interface cat {
  priorityId: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
  providers: [DatePipe]
})
export class AddNewTaskComponent implements OnInit {

    priority: cat[] = [ {priorityId: 1, viewValue: 'Low'},
                        {priorityId: 2, viewValue: 'Medium'},
                        {priorityId: 3, viewValue: 'High'}
    ];

    sprintName : any;
    categoryName : any;
    sprintData : any;
    sprintNames : any;
    userNames: any;
    usernameData: any;
    catData : any;
    catNames: any;
    taskData :any;

    taskName : any;
    description : any;
    priorityId=null;
    userName='';
    sprintId:any;
    categoryId=null;
    statusId=1;
    parentId=1;
    active=1;
    curDate:any = new Date();

    constructor(private apiService: ApiService,
                public dialog:MatDialog,
                private datePipe: DatePipe,
                private router:Router,
                public paramsService:ParamsApiService) {
                this.curDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }

    ngOnInit() {
        this.listSprint()
        this.listUsername()
        this.listCategory()

    }
    listSprint(){
        this.apiService.getSprintData().subscribe((data : any)=>{
        this.sprintData = data;
        })
    }

  // getSprintNames(data: any) {
  //   let array: any = [];
  //   data.forEach((element: any) => {
  //     array.push(element.sprintName)
  //   });
  //   return array;
  // }

    listUsername(){
        this.apiService.getUsernameData().subscribe((data : any)=>{
            this.usernameData  = data;
            this.userNames = this.getUsernames(data);
        })
    }

    getUsernames(data: any) {
        let listData: any = [];
        data.forEach((element: any) => {
            listData.push(element.user_Name)
        });
        return listData;
    }

    listCategory(){
        this.apiService.getAllCategory().subscribe((data : any)=>{
        this.catData  = data;
        });
    }

    onSubmit() {
        if ((this.taskName) &&
            (this.description)&&
            (this.priorityId) &&
            (this.userName)&&
            (this.sprintId)&&
            (this.categoryId) &&
            (this.parentId)) {
                this.addNewTask();
            } else {
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Input Required' }
            });
        }
    }

    addNewTask(){
        const data = {
            taskName : this.taskName,
            description : this.description,
            priorityId : this.priorityId,
            userName : this.userName,
            sprintId : this.sprintId,
            categoryId : this.categoryId,
            statusId : this.statusId,
            parentId : this.parentId,
            createdDate :this.curDate,
            active : this.active
        };

        this.apiService.addTask(data).subscribe((data: any) =>{
            this.taskData = data;
            let navigationExt: NavigationExtras = {
              queryParams: {
                  "sprintId": this.sprintId
              },
              skipLocationChange: false
          };
          this.paramsService.$sprintIdValue.next(this.sprintId);
            if (this.taskData) {
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Task added succesfully' }});
                this.router.navigate(['navigate/main-task'],navigationExt);
            } else {
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Task not added' }});
            }
        }, error => {});
    }
}
