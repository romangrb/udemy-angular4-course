import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(shoppingForm: NgForm) {
    if( this.editMode ) {
      this.updateItem(shoppingForm);
    } else {
      this.addItem(shoppingForm);
    }
    this.onClear();
  }

  updateItem(shoppingForm: NgForm) {
    const ingName = shoppingForm.value.name;
    const ingAmount = shoppingForm.value.amount;
    
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.updateIngredient(this.editedItemIndex, newIngredient);
  }

  addItem(shoppingForm: NgForm) {
    const ingName = shoppingForm.value.name;
    const ingAmount = shoppingForm.value.amount;
    
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
