import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "http://placekitten.com/500/500",
        name: "snickers",
        price: 250,
        quantity: 1,
        id: 1,
      },
      {
        product: "http://placekitten.com/500/500",
        name: "snickers",
        price: 250,
        quantity: 4,
        id: 1,
      },
      {
        product: "http://placekitten.com/500/500",
        name: "snickers",
        price: 250,
        quantity: 1,
        id: 1,
      },
      {
        product: "http://placekitten.com/500/500",
        name: "snickers",
        price: 250,
        quantity: 1,
        id: 1,
      },
    ],
  };

  constructor(private cartService: CartService) {}

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    return this.cartService.onClearCart();
  }
  onRemoveProduct(item: CartItem): void {
    return this.cartService.onRemoveProduct(item);
  }

  onAddQty(item: CartItem): void {
    return this.cartService.addToCart(item);
  }

  onRemoveQty(item: CartItem): void {
    return this.cartService.onRemoveQty(item);
  }
}
