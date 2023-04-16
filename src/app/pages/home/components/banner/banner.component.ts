import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { BannerService } from "src/app/services/banner.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styles: [],
})
export class BannerComponent implements OnInit, OnDestroy {
  bannerSubscription: Subscription | undefined;
  banners: any[] = [];
  banner: any;

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.bannerSubscription) this.bannerSubscription.unsubscribe();
  }

  @ViewChild("outlet", { read: ViewContainerRef })
  outletRef!: ViewContainerRef;
  @ViewChild("content", { read: TemplateRef })
  contentRef!: TemplateRef<any>;

  constructor(private bannerService: BannerService, public dialog: MatDialog) {}

  getProducts() {
    this.bannerSubscription = this.bannerService
      .getAllBanner()
      .subscribe((_banners) => {
        this.banners = _banners;
        this.banner = this.banners[0];
      });
  }

  formatDate(date: string) {
    const event = new Date(date);

    return event.toLocaleDateString("id-ID");
  }

  changeBanner(next: Boolean) {
    const current = this.banners.findIndex((el: any) => el === this.banner);
    if (next) {
      if (current === this.banners.length - 1) this.banner = this.banners[0];
      else this.banner = this.banners[current + 1];
    } else {
      if (current === 0) this.banner = this.banners[this.banners.length - 1];
      else this.banner = this.banners[current - 1];
    }
    this.rerender();
  }

  rerender() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: this.banner,
      width: "60rem",
    });
  }
}

@Component({
  selector: "dialog-data-example-dialog",
  templateUrl: "./dialog-data-example-dialog.html",
})
export class DialogDataExampleDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialog: MatDialog,
    private banner: BannerService
  ) {}

  formatDate(date: string) {
    const event = new Date(date);

    return event.toLocaleDateString("id-ID");
  }

  editBanner(id: string) {
    this.dialog.closeAll();
    this.router.navigate(["/banner-form", id]);
  }

  deleteBanner(id: string) {
    this.banner.deleteBanner(id).subscribe({
      next: (_) => {
        window.location.reload();
      },
    });
  }
}
