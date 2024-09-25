import { Component } from '@angular/core';
import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { BaseComponent } from './components/base/base.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { DialogBoxComponent } from './components/UI/dialog-box/dialog-box.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    BaseComponent,
    ProductsComponent,
    ProductDetailsComponent,
    BasketComponent,
    DialogBoxComponent,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'phone-shop';
}
