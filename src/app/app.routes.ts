import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Auth-layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout/blank-layout.component';
import { authGuard } from '../core/Guards/auth/auth.guard';
import { appGuard } from '../core/Guards/app/app.guard';

export const routes: Routes = [

  { path: "", redirectTo: "/home", pathMatch: "full" },

  // Public (Auth)
  {
    path: "",
    component: AuthLayoutComponent,
    canActivate: [appGuard],
    children: [
      {
        path: "register",
        loadComponent: () =>
          import("../pages/register/register/register.component").then(
            (m) => m.RegisterComponent
          ),
        title: "Register",
      },
      {
        path: "login",
        loadComponent: () =>
          import("../pages/login/login/login.component").then(
            (m) => m.LoginComponent
          ),
        title: "Login",
      },
    ],
  },

  // Private (after login)
  {
    path: "",
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "home",
        loadComponent: () =>
          import("../pages/home/home/home.component").then(
            (m) => m.HomeComponent
          ),
        title: "trendify",
      },
      {
        path: "blog",
        loadComponent: () =>
          import("../pages/Blog/blog/blog.component").then(
            (m) => m.BlogComponent
          ),
        title: "Blog",
      },
      {
        path: "services",
        loadComponent: () =>
          import("../pages/services/services.component").then(
            (m) => m.ServicesComponent
          ),
        title: "Brands",
      },
      {
        path: "aboutus",
        loadComponent: () =>
          import("../pages/AboutUS/aboutus/aboutus.component").then(
            (m) => m.AboutusComponent
          ),
        title: "About us",
      },
      {
        path: "cart",
        loadComponent: () =>
          import("../pages/cart/cart.component").then((m) => m.CartComponent),
        title: "cart",
      },
      {
        path: "products",
        loadComponent: () =>
          import("../pages/products/products.component").then(
            (m) => m.ProductsComponent
          ),
        title: "products",
      },
      {
        path: "allorders",
        loadComponent: () =>
          import("../pages/allorders/allorders.component").then(
            (m) => m.AllordersComponent
          ),
        title: "allorders",
      },
      {
        path: "categories",
        loadComponent: () =>
          import("../pages/categories/categories.component").then(
            (m) => m.CategoriesComponent
          ),
        title: "categories",
      },
      {
        path: "profile",
        loadComponent: () =>
          import("../pages/profile/profile/profile.component").then(
            (m) => m.ProfileComponent
          ),
        title: "profile",
      },
      {
        path: "checkout/:id",
        loadComponent: () =>
          import("../pages/checkout/checkout.component").then(
            (m) => m.CheckoutComponent
          ),
        title: "checkout",
      },
      {
        path: "details/:id",
        loadComponent: () =>
          import("../pages/details/details.component").then(
            (m) => m.DetailsComponent
          ),
        title: "details",
      },
      {
        path: "**",
        loadComponent: () =>
          import("../pages/notfound/notfound/notfound.component").then(
            (m) => m.NotfoundComponent
          ),
        title: "notfound",
      },
    ],
  },
];
