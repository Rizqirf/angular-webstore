import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./product-header.component.html",
  styles: [],
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() countChange = new EventEmitter<number>();
  sort = "desc";
  itemsShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  onItemShowCountUpdated(newCount: number): void {
    this.itemsShowCount = newCount;
    this.countChange.emit(newCount);
  }
  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
