import { AuthService } from './../../auth.service';
import { List } from './../../models/list.model';
import { Task } from './../../models/task.model';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists : List[];
  tasks : Task[];
  selectedId : string;
  isTask : boolean = false;
  constructor(public service: TaskService,private auth : AuthService,private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{

      if(params.listId){
        this.selectedId=params.listId;
        this.service.getTasks(params.listId).subscribe((tasks: any[])=>{
          this.tasks=tasks;
        });
      }else{
        this.tasks=undefined;
      }
    });

    this.service.getLists().subscribe((lists:any[])=>{
      this.lists = lists;
      
    }); 
  }

  onTaskClick(task : Task){
    this.service.complete(task).subscribe(()=>{
      task.completed=!task.completed;
    });
  }

  onClick(){
    if (this.lists.length===0){
      this.isTask=true;
    }
    else{
      this.router.navigate(['/lists',this.selectedId,'new-task']);
    }
  }
  onDeleteListClick(){
    this.service.deleteLists(this.selectedId).subscribe((res: any)=>{
      this.router.navigate(['/lists']);
      
    });
  }

  onLogoutClick(){
    this.auth.logout();
  }

  onTaskDelete(taskId: string){
    this.service.deleteTasks(this.selectedId,taskId).subscribe((res: any)=>{
      
      this.tasks = this.tasks.filter(val => val._id !== taskId);
      
      //this.router.navigate(['/lists']);
      
    });
  }

  

}
