import { List } from './../../models/list.model';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private service : TaskService, private router : Router) { }

  ngOnInit(): void {
  }

  createList(title : string){
    this.service.createList(title).subscribe((list:List)=>{
      this.router.navigate(['/lists',list._id]);  
    });
  }

  
}
