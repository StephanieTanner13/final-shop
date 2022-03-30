import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemItemComponent } from './items/item-list/item-item/item-item.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemService } from './items/item.service';
import { ItemsComponent } from './items/items.component';
import { HeaderComponent } from './header.component';
import { WindRefService } from './wind-ref.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemsComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemItemComponent,
    ItemEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ItemService, WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
