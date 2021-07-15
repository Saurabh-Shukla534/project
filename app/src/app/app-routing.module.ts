import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path:"form", component: FormsComponent},
  {path:"table", component:TableComponent}
  // {path:"edit/:id", component: FormsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
