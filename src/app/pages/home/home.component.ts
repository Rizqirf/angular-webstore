import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = "desc";
  limit = "12";
  productsSubscribtion: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscribtion) this.productsSubscribtion.unsubscribe();
  }

  getProducts() {
    this.productsSubscribtion = this.storeService
      .getAllProducts(this.limit, this.sort, this.category)
      .subscribe((_products) => (this.products = _products));
  }

  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
  onCountChange(newCount: number): void {
    this.limit = newCount.toString();
    this.getProducts();
  }
}
