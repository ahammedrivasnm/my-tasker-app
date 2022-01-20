import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { ApiService } from 'src/app/services/api.service';

interface cat {
  priorityId: number;
  viewValue: string;
}
@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.css']
})
export class AddSubtaskComponent implements OnInit {

  priority: cat[] = [
    {priorityId: 1, viewValue: 'Low'},
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
  taskId:any;
  taskName : any;
  description : any;
  priorityId=null;
  userName='';
  sprintId=null;
  categoryId=null;
  statusId=1;
  parentId:any;
  active=1;
  inTaskView=true;
  subtaskdata:any;
  curDate:any = new Date();
  constructor(
                private apiService: ApiService,
                public dialog:MatDialog,
                private datePipe: DatePipe,
              	private route:ActivatedRoute,
                private router: Router) {
                    this.curDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
                }

ngOnInit() {
    this.listSprint();
    this.listUsername();
    this.listCategory();
    this.getQueryParams();
}
listSprint(){
    this.apiService.getSprintData().subscribe((data : any)=>{
    this.sprintData = data;
    })
}
getQueryParams(){
  this.route.queryParams.forEach(params => {
      if (params["taskId"] && params["taskId"] > 0){
          this.taskId = params["taskId"];
      }
  });
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
    })
}

onSubmit() {
    if ((this.taskName) &&
        (this.description)&&
        (this.priorityId) &&
        (this.userName)&&
        (this.sprintId)&&
        (this.categoryId) &&
        (this.active)) {
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
        parentId : this.taskId,
        createdDate :this.curDate,
        active : this.active,
        };
        this.apiService.addTask(data).subscribe((data: any) =>{
            this.taskData = data;
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "taskId": this.taskId
                },
                skipLocationChange: false
            };
            if (this.taskData) {
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Subtask added succesfully' }});
                this.router.navigate(['navigate/subtask'],navigationExtras);
            } else {
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Subtask not added' }});
            }
            }, error => {});
    }
}
