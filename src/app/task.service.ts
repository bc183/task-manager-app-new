import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private service : WebRequestService) { }

  createList(title : string){
    return this.service.post('lists',{title});
  }

  updateList(id : string,title : string){
    return this.service.patch(`lists/${id}`,{title});
  }
  updateTask(taskId: string,listId : string,title : string){
    return this.service.patch(`lists/${listId}/tasks/${taskId}`,{title});
  }
  createTask(title : string, listId: string){
    return this.service.post(`lists/${listId}/tasks`,{title,completed: true});
  }

  deleteLists(id : string){
    return this.service.delete(`lists/${id}`);
  }

  deleteTasks(listId : string,taskId: string){
    return this.service.delete(`lists/${listId}/tasks/${taskId}`);
  }

  getLists(){
    return this.service.get('lists');
  }

  getTasks(listId){
    return this.service.get(`lists/${listId}/tasks`);
  }

  complete(task : Task){
    return this.service.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    });
  }
}
