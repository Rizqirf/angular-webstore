import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, switchMap } from "rxjs";
import { BannerService } from "src/app/services/banner.service";

@Component({
  selector: "app-banner-form",
  templateUrl: "./banner-form.component.html",
  styles: [],
})
export class BannerFormComponent implements OnInit, OnDestroy {
  title = "Angular Form Validation Tutorial";

  myForm: FormGroup = this.fb.group({
    Title: ["", Validators.required],
    Image_Banner: ["", Validators.required],
    Description: ["", Validators.required],
    Start_Time: ["", Validators.required],
    End_Time: ["", Validators.required],
  });
  selectedId: number | undefined;
  selectedBanner: any;
  sub: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private banner: BannerService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  get f() {
    return this.myForm.controls;
  }

  ngOnInit() {
    this.sub = this.router.params.subscribe((params) => {
      this.selectedId = +params["id"];
      if (this.selectedId)
        this.banner.getBanner(this.selectedId).subscribe((data: any) => {
          this.selectedBanner = data;
          Object.keys(this.f).forEach((key) => {
            if (key === "Start_Time" || key === "End_Time") {
              var temp = data[key.toLowerCase()].split("T")[0];
              this.f[key].setValue(temp);
            } else this.f[key].setValue(data[key.toLowerCase()]);
          });
        });
    });
  }

  ngOnDestroy(): void {
    if (!this.sub) return;
    this.selectedBanner = undefined;
    this.selectedId = undefined;
    this.sub.unsubscribe();
  }

  onClickSubmit() {
    console.log(this.selectedBanner);
    if (this.myForm.status !== "VALID") return;
    var payload: any = {};
    Object.keys(this.f).forEach((key) => {
      if (key === "Start_Time" || key === "End_Time") {
        payload = { ...payload, [key]: this.f[key].value + "T00:00:00.000Z" };
      } else {
        payload = { ...payload, [key]: this.f[key].value };
      }
    });

    if (!this.selectedId)
      this.banner
        .submitBanner(payload)
        .subscribe({ next: (_) => this.route.navigate(["/home"]) });
    else
      this.banner
        .editBanner(this.selectedId, payload)
        .subscribe({ next: (_) => this.route.navigate(["/home"]) });
  }
}
