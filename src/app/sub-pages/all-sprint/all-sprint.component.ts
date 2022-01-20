import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-sprint',
  templateUrl: './all-sprint.component.html',
  styleUrls: ['./all-sprint.component.css']
})
export class AllSprintComponent implements OnInit {
  sprintData : any;
  inTaskView = true;

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

