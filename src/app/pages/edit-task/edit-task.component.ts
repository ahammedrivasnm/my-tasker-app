import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  sprintId:any;
  taskName:any;
  description:any;
  priorityId:any;
  priority:any;
  userName:any;
  userNames:any;
  sprintData:any;
  categoryId:any;
  catData:any;
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){}
}
