import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pending-task',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.css']
})
export class PendingTaskComponent implements OnInit {
  taskData : any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
      this.listTask();
  }

  listTask() {
      this.apiService.getAllTask().subscribe((data : any) => {
          this.taskData = data;
      });
  }
}
