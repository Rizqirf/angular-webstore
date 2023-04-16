import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./pages/cart/cart.component";
import { HomeComponent } from "./pages/home/home.component";
import { BannerFormComponent } from "./pages/banner-form/banner-form.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "banner-form",
    component: BannerFormComponent,
    children: [],
  },
  {
    path: "banner-form/:id",
    component: BannerFormComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
