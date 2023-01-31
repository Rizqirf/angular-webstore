import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_items) => _items.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open(`${item.name} added to cart`, "ok", { duration: 3000 });

    console.log(this.cart.value.items);
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }

  onClearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart Emptied", "ok", { duration: 3000 });
  }

  onRemoveProduct(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    this.cart.next({ items: filteredItems });
    this._snackBar.open(`${item.name} removed`, "ok", { duration: 3000 });
  }

  onRemoveQty(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_items) => _items.id === item.id);
    if (itemInCart) {
      itemInCart.quantity -= 1;
      if (itemInCart.quantity === 0) {
        this.onRemoveProduct(itemInCart);
      } else {
        this.cart.next({ items });
        this._snackBar.open(`1 ${item.name} removed from cart`, "ok", {
          duration: 3000,
        });
      }
    }

    console.log(this.cart.value.items);
  }
}
