import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})

export class ItemEditComponent implements OnInit {
  originalItem: Item;
  item: Item;
  children: Item[] = [];
  editMode: boolean = false;
  id: string;

  hasChildren: boolean = false;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        return;
      }

      this.originalItem = this.itemService.getItem(this.id);
      if (!this.originalItem) {
        return;
      }

      this.editMode = true;
      this.item = JSON.parse(JSON.stringify(this.originalItem));
    });
  }

  onSubmit(form: NgForm){
    let newItem = new Item(form.value.id, form.value.title, form.value.description, form.value.image);
    if (this.editMode === true) {
      this.itemService.updateItem(this.originalItem, newItem);
    } else {
      this.itemService.addItem(newItem);
    }

    this.router.navigate(['/items']);
  }

  onCancel() {
    this.router.navigate(['/items']);
  }
}
