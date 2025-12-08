import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from "./recipe.model";
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Pizza', 'Margherita', 'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza.jpg',
  //     [
  //       new Ingredient('Tomatoes', 2),
  //       new Ingredient('Mussarela', 1)
  //     ]),
  //   new Recipe('Pudim', 'Leite Condensado', 'https://naminhapanela.com/wp-content/uploads/2019/12/Pudim_leite_condensado-3-1024x685.jpg',
  //     [
  //       new Ingredient('Milk', 1)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
