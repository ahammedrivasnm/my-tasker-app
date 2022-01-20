import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ParamsApiService } from 'src/app/services/params-api.service';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';

declare var $: any;
interface cat {
  priorityId: number;
  priorityName:string;
  viewValue: string;
}

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css']
})
export class SubtaskComponent implements OnInit {
  priorityList: cat[] = [
    {priorityId: 1,priorityName:'Low', viewValue: 'Low'},
    {priorityId: 2,priorityName:'Medium', viewValue: 'Medium'},
    {priorityId: 3,priorityName:'High', viewValue: 'High'}
];
	idToDelete :any;
  	inTaskView = true;
  	subtaskdata:any;
    taskList : any = [];
    deleteIndex: any;
    taskName :any;
    sprintId: any;
    sprintData : any;
    sprintNames : any;
    taskData:any = [];
    parentTaskData:any = [];
    dataSprintId : any;
    taskStatus : any = '';
    allData : any;
    curSprintId : any;
    editSubTask: any = {};
    taskEdit:any;
    catData:any;
    statusData:any;
    taskId:any;
    parantTask:any;
    editSubTaskIndex: any = {};

  	constructor(private paramsApiService:ParamsApiService,
              	private apiService: ApiService,
              	private router:Router,
              	public  dialog:MatDialog,
              	private route:ActivatedRoute) { }

  	ngOnInit() {
        this.paramsApiService.$backIdValue.next(2);
        // this.paramsApiService.$backField.next(true);
        // this.paramsApiService.$sprintField.next(false);
        this.getQueryParams();
        this.listSprint();
        this.listCategory();
        this.listStatus();
  	}

    ngAfterViewInit() {
        this.paramsApiService.$backField.next(true);
        this.paramsApiService.$sprintField.next(false);
    }

    loadAddTaskComponent() {
    	this.inTaskView=false;
  	}

    listSprint(){
        this.apiService.getSprintData().subscribe((data : any)=>{
        this.sprintData = data;
        });
    }

    listCategory(){
        this.apiService.getAllCategory().subscribe((data : any)=>{
        this.catData  = data;
        });
    }

    listStatus(){
        this.apiService.getAllStatus().subscribe((data : any)=>{
        this.statusData  = data;
        });
    }

  	deleteTask() {
      let navigationExtras: NavigationExtras = {
        queryParams: {
            "taskId": this.taskId
        },
        skipLocationChange: false
    };
    	if (this.idToDelete) {
        	this.apiService.deleteTask(this.idToDelete).subscribe((data : any) => {
        	    this.taskList.splice(this.deleteIndex,1);
        	    $('#deleteModal').modal('hide');
              this.dialog.open(LoginDialogComponent, { data:{ msg:'Subtask deleted' }});
              this.router.navigate(['navigate/subtask'],navigationExtras);
    	    });
    	}else{
        this.dialog.open(LoginDialogComponent, { data:{ msg:'Subtask not deleted' }});
        this.router.navigate(['navigate/subtask'],navigationExtras);}
	}

    getQueryParams(){
        this.route.queryParams.forEach(params => {
            if (params["taskId"] && params["taskId"] > 0){
                this.taskId = params["taskId"];
                this.apiService.getSubtask(this.taskId ).subscribe((data : any) => {
                    this.taskData =data;
                    this.loadTask(this.taskStatus);
                });
                this.apiService.getParentTask(this.taskId ).subscribe((data : any) => {
                    this.parentTaskData =data;
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
        this.apiService.getSubtask(this.dataSprintId).toPromise().then((data : any) => {
            this.taskData =  arrayList.length > 0 ? arrayList : data;
            this.loadTask(this.taskStatus);
        });
    }

    setDeleteValues(taskId: any,taskName:any, index: number) {
        this.deleteIndex = index;
        this.idToDelete = taskId;
        this.taskName = taskName;
        $('#deleteModal').appendTo("body").modal('show');
    }

    getCurrentSprint(){
        this.apiService.getCurrentSprint().subscribe((data : any) => {
            this.curSprintId = data[0].sprint_Id;
            this.sprintId = data[0].sprint_Id;
            if(this.curSprintId){
                this.apiService.getSubtask(this.sprintId ).subscribe((data : any) => {
                    this.taskData =data;
                    this.loadTask(this.taskStatus);
                });
            }else{}
        });
    }

    saveChanges(subtask:any, index: any = null) {
        const REQ_OBJ = {
            taskId : subtask.task_Id ? subtask.task_Id : '',
            description : subtask.description ? subtask.description : '',
            priorityId : subtask.priority_Id ? subtask.priority_Id : '',
            sprintId : subtask.sprint_Id ? subtask.sprint_Id : '',
            categoryId : subtask.category_Id ? subtask.category_Id : '',
            statusId : subtask.status_Id ? subtask.status_Id : ''
        };
        this.apiService.editTask(REQ_OBJ).subscribe((data : any) =>{
            this.taskEdit = data;
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "taskId": this.taskId
                },
                skipLocationChange: false
            };
            if (this.taskEdit) {
                this.getQueryParams();
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Changes Saved' }});
                this.router.navigate(['navigate/subtask'],navigationExtras);
                this.editSubTaskIndex[index]=false;
            } else {
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Changes Not Saved' }});
                this.router.navigate(['navigate/subtask'],navigationExtras);
            }
        }, error => {});
        $('#editSubTaskModal').modal('hide');
    }

    setEditValues(task: any, index: number){
        this.editSubTask =null;
        this.editSubTask = task;
        $('#editSubTaskModal').appendTo("body").modal('show');
    }
}
