import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
              .subscribe(
                (index: number) => {
                  this.editedItemIndex = index;
                  this.editMode = true;
                  this.editedItem = this.slService.getIngredient(index);
                  this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                  })
                }
              );
  }

  onSubmitItem(form: NgForm){
    //const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    // this.ingredientAdded.emit(newIngredient);

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    } else
    {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  onClear(){
    this.slForm.reset();
    this.editMode= false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
