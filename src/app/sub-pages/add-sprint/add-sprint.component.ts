import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.css']
})
export class AddSprintComponent implements OnInit {
  loginForm: FormGroup;
  startDate: any;
  sprintName:any;
  endDate: any;
  sprintData: any;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public dialog:MatDialog,
        private apiService: ApiService)
        {
        this.loginForm = this.formBuilder.group({
            useremail: ['', Validators.required],
            password: ['', Validators.required]
         });
        }

  ngOnInit() {

  }
  get f() { return this.loginForm.controls; }

  onSubmit() {

    if ((this.sprintName) &&
        (this.startDate)&&
        (this.endDate)) {
            this.postSprintData();
    } else {
        this.dialog.open(LoginDialogComponent, { data:{ msg:'Input Required' }});
    }
}

  postSprintData() {
    const data = {
      sprintName:this.sprintName,
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.apiService.addSprint(data).subscribe((data: any) =>{
        this.sprintData = data;
        console.log(this.sprintData+" : getsprintData");
        if (this.sprintData) {
          this.dialog.open(LoginDialogComponent, { data:{ msg:'Sprint added succesfully' }});
          this.router.navigate(['navigate/sprint']);
        } else {
          this.dialog.open(LoginDialogComponent, { data:{ msg:'Not added' }});
        }
    }, error => {});
}
}
