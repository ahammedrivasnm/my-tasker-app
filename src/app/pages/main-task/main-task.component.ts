import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { ParamsApiService } from 'src/app/services/params-api.service';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;
interface cat {
    priorityId: number;
    priorityName:string;
    viewValue: string;
}
interface sel {
    value: string;
    viewValue: string;
}
@Component({
    selector: 'app-main-task',
    templateUrl: './main-task.component.html',
    styleUrls: ['./main-task.component.css']
})
export class MainTaskComponent implements OnInit {
    priorityList: cat[] = [
        {priorityId: 1,priorityName:'Low', viewValue: 'Low'},
        {priorityId: 2,priorityName:'Medium', viewValue: 'Medium'},
        {priorityId: 3,priorityName:'High', viewValue: 'High'}
];

    sprintId: any;
    sprintData : any;
    sprintNames : any;
    taskData:any = [];
    inTaskView = true;
    dataSprintId : any;
    taskStatus : any = '';
    allData : any;
    taskList : any = [];
    deleteIndex: any;
    idToDelete: any;
    curSprintId : any;
    taskName :any;
    taskId:any;
    navSprintId:any;
    description:any;
    priorityId:any;
    priority:any;
    userName:any;
    userNames:any;
    categoryId:any;
    statusId:any;
    catData:any;
    statusData:any;
    editTask: any = {};
    taskEdit:any;
    editIndex:any;

    constructor(private apiService: ApiService,
                private paramsApiService:ParamsApiService,
                private router:Router,
                public dialog: MatDialog,
                private route:ActivatedRoute
    ) {}

  	ngOnInit() {
        this.paramsApiService.$backField.next(false);
        this.paramsApiService.$backIdValue.next(1);
        this.paramsApiService.$sprintField.next(true);
        this.getQueryParams();
        this.listSprint();
        this.listCategory();
        this.listStatus();
  	}
    listSprint(){
        this.apiService.getSprintData().subscribe((data : any)=>{
        this.sprintData = data;
        });
    }
    listCategory(){
        this.apiService.getAllCategory().subscribe((data : any)=>{
        this.catData  = data;
        })
    }

    listStatus(){
      this.apiService.getAllStatus().subscribe((data : any)=>{
      this.statusData  = data;
      })
    }

    onSubmit(){}
    getQueryParams(){
        this.route.queryParams.forEach(params => {
            if (params["sprintId"] && params["sprintId"] > 0){
                this.sprintId = params["sprintId"];
                this.apiService.getTask(this.sprintId ).subscribe((data : any) => {
                    this.taskData =data;
                    this.loadTask(this.taskStatus);
                });
            }
            else{
                this.getCurrentSprint();
            }
        });
    }

 	loadTask(status:any='') {
        this.taskStatus = status;
        let tempArray = [];
        this.getSprintId();
        if (status == "Pending") {
            tempArray = status== "Pending" ? this.taskData.filter((element: any) => element.status_Name === "Pending" ||
                                                                                    element.status_Name === "Hold" ||
                                                                                    element.status_Name === "Inprogress" ||
                                                                                    element.status_Name === "New"):
            this.taskData.filter( (element: any) => element.status_Name === status);
            this.inTaskView = true;
            this.taskList= tempArray;
        }
        else if(status == "Completed"){
            tempArray = status== "Completed" ? this.taskData.filter( ( element: any) => element.status_Name === "Completed" ||
                                                                                        element.status_Name === "Verified" ||
                                                                                        element.status_Name === "Stopped"):
            this.taskData.filter( (element: any) => element.status_Name === status);
            this.inTaskView = true;
            this.taskList= tempArray;
        }
        else {
            this.inTaskView = true;
            this.taskList=this.taskData;
        }
  	}

    getSprintId(sprId: any = null) {
        if (sprId) {
            this.listTask(sprId)
        }
    }

    listTask(sprintId:any, arrayList: any = []) {
        this.dataSprintId = sprintId ? sprintId : this.paramsApiService.getparam();
        this.apiService.getTask(this.dataSprintId).toPromise().then((data : any) => {
            this.taskData =  arrayList.length > 0 ? arrayList : data;
            this.loadTask(this.taskStatus);
        });
    }

  	loadAddTaskComponent() {
    	this.inTaskView=false;
  	}

    setDeleteValues(taskId: any,taskName:any, index: number) {
        this.deleteIndex = index;
        this.idToDelete = taskId;
        this.taskName = taskName;
        $('#deleteModal').appendTo("body").modal('show');
    }

    deleteTask() {
        let navigationExtra: NavigationExtras = {
            queryParams: { "sprintId": this.sprintId
            },
            skipLocationChange: false
        };
        if (this.idToDelete) {
            this.apiService.deleteTask(this.idToDelete).subscribe((data : any) => {
                this.taskList.splice(this.deleteIndex,1);
                $('#deleteModal').modal('hide');
            });
            this.dialog.open(LoginDialogComponent, { data:{ msg:'Task deleted' }});
            this.router.navigate(['navigate/main-task'],navigationExtra);
        }else{
            this.dialog.open(LoginDialogComponent, { data:{ msg:'Task not deleted' }});
            this.router.navigate(['navigate/main-task'],navigationExtra);
        }
    }

    getCurrentSprint(){
        this.apiService.getCurrentSprint().subscribe((data : any) => {
            this.curSprintId = data[0].sprint_Id;
            this.sprintId = data[0].sprint_Id;
            this.paramsApiService.$sprintIdValue.next(this.sprintId);
            if(this.curSprintId){
                this.apiService.getTask(this.sprintId ).subscribe((data : any) => {
                    this.taskData =data;
                    this.loadTask(this.taskStatus);
                });
            }else{}
        });
    }

    saveChanges(taskId:any,sprintId:any,statusId:any,categoryId:any,priorityId:any,description:any){
        if(taskId && sprintId && statusId && categoryId && priorityId && description){
            const data = {
                taskId : taskId,
                description : description,
                priorityId : priorityId,
                sprintId : sprintId,
                categoryId : categoryId,
                statusId : statusId
            };
            this.apiService.editTask(data).subscribe((response : any) =>{
                let navigationExtra: NavigationExtras = {
                    queryParams: {
                        "sprintId": this.sprintId
                    },
                    skipLocationChange: false
                };
                this.taskEdit = response;
                if (this.taskEdit) {
                    // this.taskList[this.editIndex]=response;
                    this.getQueryParams();
                    this.dialog.open(LoginDialogComponent, { data:{ msg:'Changes Saved' }});
                    this.router.navigate(['navigate/main-task'],navigationExtra);
                } else {
                    this.dialog.open(LoginDialogComponent, { data:{ msg:'Changes Not Saved' }});
                    this.router.navigate(['navigate/main-task'],navigationExtra);
                }
            }, error => {});
        }
        $('#editTaskModal').modal('hide');
    }

    setEditValues(task: any, index: number){
        this.editTask = null;
        this.editIndex=index;
        this.editTask = task;
        $('#editTaskModal').appendTo("body").modal('show');
    }

	listSubtask(task:any){
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "taskId": task.task_Id
            },
            skipLocationChange: false
        };
        if(task.task_Id){

            this.router.navigate(['navigate/subtask'], navigationExtras);
        } else {this.dialog.open(LoginDialogComponent, { data:{ msg:'Error Detected' }});}
    }
}
