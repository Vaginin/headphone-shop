import { Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
	{ path: '', component: BaseComponent },
	{ path: 'products', component: ProductsComponent },
	{ path: 'products/:id', component: ProductDetailsComponent },
	{ path: 'basket', component: BasketComponent },
	{ path: 'favorites', component: FavoritesComponent },
	{ path: '**', redirectTo: '', component: BaseComponent }
];


