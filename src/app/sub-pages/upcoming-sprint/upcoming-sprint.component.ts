import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upcoming-sprint',
  templateUrl: './upcoming-sprint.component.html',
  styleUrls: ['./upcoming-sprint.component.css']
})
export class UpcomingSprintComponent implements OnInit {
  sprintData : any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.listTask();
  }
  listTask() {
    this.apiService.getSprintData().subscribe((data : any) => {
        this.sprintData = data;
    });
  }
}

