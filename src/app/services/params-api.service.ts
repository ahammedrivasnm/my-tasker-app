import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamsApiService {

    $sprintField = new BehaviorSubject<boolean>(true);
    $sprintContent = new BehaviorSubject<boolean>(true);
    $backField = new BehaviorSubject<boolean>(false);
    $sprintIdValue = new BehaviorSubject<number>(1);
    $backIdValue = new BehaviorSubject<number>(1);
    $userNameValue = new BehaviorSubject<string>('');
    param : any;

    setparam(id:any) {
        this.param=id;
    }

    getparam(){
        return this.param;
    }

    constructor(private router:Router,
                private http:HttpClient){ }

    getSprintId(){
        return this.$sprintIdValue;
    }

    get sprintValue(){
        return this.$sprintIdValue.asObservable();
    }

    get backValue(){
        return this.$backIdValue.asObservable();
    }

}
