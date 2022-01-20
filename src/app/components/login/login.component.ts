import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras} from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import { MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component'
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    userData: any;
    isFetchedData = false;
    loginSuccess :any ='login_successfully'

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public dialog:MatDialog,
        private apiService: ApiService) {
            this.loginForm = this.formBuilder.group({
                useremail: ['', Validators.required],
                password: ['', Validators.required]
            });
        }

    ngOnInit() {
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        if ((this.loginForm.controls.useremail.getError('required')) && (this.loginForm.controls.password.getError('required'))) {
            this.dialog.open(LoginDialogComponent, { data:{ msg:'Useremail and Password Required' }});
        } else if (this.loginForm.controls.password.getError('required')){
            this.dialog.open(LoginDialogComponent, { data:{ msg:'Password Required' }});
        } else if (this.loginForm.controls.useremail.getError('required')){
            this.dialog.open(LoginDialogComponent, { data:{ msg:'Useremail Required' }});
        } else {
            this.getUserData();
        }
    }

    getUserData() {
        const data = {
            userEmail: this.loginForm.controls.useremail.value ,
            userPassword:this.loginForm.controls.password.value
        };
        this.apiService.userLogin(data).subscribe((data: any) =>{
            this.userData = data;
            if (this.userData.message === this.loginSuccess) {
                let navigationExtra: NavigationExtras = {
                    queryParams: { "userEmail": this.loginForm.controls.useremail.value
                    },
                    skipLocationChange: true
                };
                this.router.navigate(['navigate'],navigationExtra);
            } else {
                this.dialog.open(LoginDialogComponent, { data:{ msg:'Username or Password Incorrect' }});
            }
        }, error => {});
    }
}
