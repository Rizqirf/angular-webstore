import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from "@angular/core";
import { StoreService } from "src/app/services/store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styles: [],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscribtion: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscribtion = this.storeService
      .getAllCategories()
      .subscribe((res) => (this.categories = res));
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscribtion) this.categoriesSubscribtion.unsubscribe();
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
