import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/items', pathMatch: 'full'},
  {path: 'items', component: ItemsComponent, children: [
    { path: 'new', component: ItemEditComponent },
    { path: ':id', component: ItemDetailComponent },
    { path: ':id/edit', component: ItemEditComponent }
  ]},

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
