import { ParamsApiService } from './../../services/params-api.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
declare var $: any;
@Component({
  selector: 'app-sprint-page',
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.css']
})
export class SprintPageComponent implements OnInit {
    sprintId : any;
    sprintData : any;
    inTaskView = true;
    loadAddSprint = false;
    loadAllSprint = true;
    loadCompletedSprint = false;
    loadUpcommingSprint =false;
    curSprintId : any;
    deleteIndex: any;
    idToDelete: any;
    sprintName: any;

    constructor(private apiService: ApiService,
                public dialog:MatDialog,
                private router: Router,
                private paramsApiService:ParamsApiService) { }

    ngOnInit() {
        this.paramsApiService.$backIdValue.next(2);
        this.paramsApiService.$sprintField.next(false);
        this.paramsApiService.$backField.next(true);
        this.listSprint();
    }
    listSprint() {
        this.apiService.getSprintDataList().subscribe((data : any) => {
            this.sprintData = data.sort((x:any) =>x.sprint_Id);
            this.getCurrentSprint();
        });
    }
    loadCompletedSprintComponent() {
        this.apiService.getCompletedSprint().subscribe((data : any) => {
        this.sprintData = data;
        this.getCurrentSprint();
        });
    }
    loadAllSprintComponent() {
    this.inTaskView=true;
    this.listSprint();
    }
    loadUpcommingSprintComponent(){
        this.apiService.getUpcommingSprint().subscribe((data : any) => {
        this.sprintData = data;
        this.getCurrentSprint();
        });
    }

    loadAddSprintComponent() {
        this.inTaskView=false;
    }

    getCurrentSprint(){
        this.apiService.getCurrentSprint().subscribe((data : any) => {
            this.curSprintId = data;
            if(this.curSprintId){
                const sprintArray= this.sprintData;
                let a= sprintArray.findIndex( (x:any) => x.sprint_Id == this.curSprintId[0].sprint_Id)
                if(a>-1){
                sprintArray.splice(0,0,this.sprintData[a])
                sprintArray.splice(a+1,1);
                }
            }else{}
        });
    }

    onSelectSprints(sprintId :any) {
        this.paramsApiService.$sprintIdValue.next(sprintId);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "sprintId": sprintId,
            },
            skipLocationChange: false
        };
        this.router.navigate(['navigate/main-task'], navigationExtras);
    }

    setDeleteValues(sprintId: any,sprintName:any, index: number) {
        this.deleteIndex = index;
        this.idToDelete = sprintId;
        this.sprintName = sprintName;
        $('#deleteModal').appendTo("body").modal('show');
    }

    deleteSprint(){
        if (this.idToDelete) {
            this.apiService.deleteSprint(this.idToDelete).subscribe((data : any) => {
                this.sprintData.splice(this.deleteIndex,1);
                $('#deleteModal').modal('hide');
            });
            this.dialog.open(LoginDialogComponent, { data:{ msg:'Sprint deleted' }});
            this.router.navigate(['navigate/sprint']);
        }
    }
}
