import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-all-task',
    templateUrl: './all-task.component.html',
    styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {

    taskData : any;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        // this.listTask();
    }

    listTask() {
        // this.apiService.getTaskDetails().subscribe((data : any) => {
        //     this.taskData = data;
        // });
    }
}
