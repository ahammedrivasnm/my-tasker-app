import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { ParamsApiService } from '../services/params-api.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit  {

    sprintId: any;
    sprintData : any = [];
    sprintNames : any;
    curSprintId : any;
    loadSelectSprint = false;
    showApp = false;
    sprintField= true;
    backField= true;
    sprintContent= true;
    backId: any;
    userEmail: any;
    userName: any;
    userNameData: any;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe( map(result => result.matches));

    constructor(
        private breakpointObserver: BreakpointObserver,
        private apiService: ApiService,
        public paramsService:ParamsApiService,
        private router: Router,
        private route: ActivatedRoute,
        ) {}

    ngOnInit() {
        this.paramsService.$sprintIdValue.subscribe(data=> this.sprintId = data);
        this.paramsService.$sprintContent.subscribe(data=> this.sprintContent = data);
        this.paramsService.$userNameValue.subscribe(data=> this.userName = data);
        this.getUserName();
        this.getCurrentSprint();
    }

    ngAfterViewInit() {
        this.paramsService.$sprintField.subscribe(data=> this.sprintField = data);
        this.paramsService.$backField.subscribe(data=> this.backField = data);
    }

    listSprint(id : any = null) {
        if(id) {
            this.sprintId = id;
        }
        this.apiService.getSprintData().subscribe((data : any) => {
        this.sprintData = data;
        });
    }

    getUserName(){
        this.route.queryParams.forEach(param => {
            if(param["userEmail"]){
                this.userEmail = param["userEmail"];
                this.apiService.getUser(this.userEmail).subscribe((data : any) => {
                    this.userNameData =data.userName;
                    if(this.userNameData){
                      sessionStorage.setItem('userName', this.userNameData);
                        this.paramsService.$userNameValue.next(this.userNameData);
                        this.paramsService.$userNameValue.subscribe(element=> this.userName = element);
                    }else{
                        this.paramsService.$userNameValue.subscribe(element=> this.userName = element);
                        this.userName = sessionStorage.getItem('userName');
                    }
                });
            }else{
              this.userName = sessionStorage.getItem('userName');
            }
        });
    }

    getSprintNames(data: any) {
        let sprintNames: any = [];
        data.forEach((element: any) => { sprintNames.push(element.sprintName) });
        return sprintNames;
    }

    onSelectSprints(sprintId :any) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "sprintId": sprintId
            },
            skipLocationChange: false
        };
        if(this.sprintContent==true){
            this.router.navigate(['navigate/main-task'], navigationExtras);
        }
    }

    getCurrentSprint(){
        this.apiService.getCurrentSprint().subscribe((data : any) => {
            this.curSprintId = data[0].sprint_Id;
            this.sprintId = data[0].sprint_Id;
            this.paramsService.$sprintIdValue.next(this.sprintId);
            if(this.curSprintId){
                this.listSprint(this.curSprintId);
                this.onSelectSprints(this.curSprintId);
            }else{
                this.listSprint(1);
                this.onSelectSprints(1);
            }
        });
    }

    goBack(){
        this.paramsService.$backIdValue.subscribe(data=> this.backId = data);
        if(this.backId === 2){
            this.paramsService.$backField.next(false);
            this.router.navigate(['navigate/main-task']);
        }
    }

    goLogout(){
        $('#logoutModal').appendTo("body").modal('show');
    }

    confirmLogout(){
        this.router.navigate(['login']);
        $('#logoutModal').modal('hide');
    }
}
