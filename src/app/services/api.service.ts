import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseURL=environment.baseUrl
  constructor(
    private router:Router,
    private http:HttpClient) { }

  getAllTask()
  {
    return this.http.get(this.baseURL+"tasker/task/all")
  }

  userLogin(data:any)
  {
    return this.http.post(this.baseURL+`tasker/user/login`,data);
  }

  getSprintData()
  {
    return this.http.get(this.baseURL+"tasker/sprint/all")
  }

  getSprintDataList()
  {
    return this.http.get(this.baseURL+"tasker/sprint/allSprint")
  }

  getUpcommingSprintData()
  {
    return this.http.get(this.baseURL+"tasker/sprint/allUpcomming")
  }

  getTaskDetails(dataId:any)
  {
    return this.http.get(this.baseURL+"tasker/task/allTask")
  }

  getUsernameData()
  {
    return this.http.get(this.baseURL+"tasker/user/allUsername")
  }

  addSprint(data:any)
  {
    return this.http.post(this.baseURL+`tasker/sprint/add`,data);
  }

  getTask(sprintId:any)
  {
    let params = new HttpParams().set("sprintId", sprintId);
    return this.http.get(this.baseURL+"tasker/task/getTask",{params});
  }

  getSubtask(dataId:any)
  {
    let params = new HttpParams().set("taskId", dataId);
    return this.http.get(this.baseURL+"tasker/task/getSubtask",{params});
  }

  getParentTask(dataId:any)
  {
    let params = new HttpParams().set("taskId", dataId);
    return this.http.get(this.baseURL+"tasker/task/getParentTask",{params});
  }

  getAllCategory()
  {
    return this.http.get(this.baseURL+"tasker/category/all")
  }

  getAllStatus()
  {
    return this.http.get(this.baseURL+"tasker/status/all")
  }

  getUser(data:any)
  {
    let params = new HttpParams().set("userEmail", data);
    return this.http.get(this.baseURL+`tasker/user/getUser/?userEmail=${data}`);
  }

    // return this.http.get( this.baseURL + 'tasker/user/getUser', {
    //   headers: new HttpHeaders().set( 'userEmail', data.toString() ),
    //   responseType: 'text'
  // } );

  addTask(data:any)
  {
    return this.http.post(this.baseURL+`tasker/task/add`,data);
  }

  deleteTask(data:any)
  {
    const body='';
    let params = new HttpParams().set("taskId", data);
    return this.http.put<any>(this.baseURL+`tasker/task/delete/?${params}`, body);
  }

  getCurrentSprint()
  {
    return this.http.get(this.baseURL+`tasker/sprint/currentSprint`);
  }

  getCompletedSprint()
  {
    return this.http.get(this.baseURL+`tasker/sprint/completedSprint`);
  }

  getUpcommingSprint()
  {
    return this.http.get(this.baseURL+`tasker/sprint/upcommingSprint`);
  }

  deleteSprint(dataId:any)
  {
    let params = new HttpParams().set("sprintId", dataId);
    return this.http.delete(this.baseURL+"tasker/sprint/delete",{params});
  }

  editTask(data:any){
    return this.http.put(this.baseURL+`tasker/task/editTask`,data);
  }
}
