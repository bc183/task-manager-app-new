import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path:"",redirectTo:"lists",pathMatch:"full"},
{path:"new-list",component:NewListComponent},
{path:"lists/:listId",component:TaskViewComponent},
{path:"lists",component:TaskViewComponent},
{path:"lists/:listId/new-task",component:NewTaskComponent},
{path:"login",component:LoginPageComponent},
{path:"signup",component:SignupPageComponent},
{path:"edit-lists/:listId",component:EditListComponent},
{path:"lists/:listId/edit-tasks/:taskId",component:EditTaskComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
