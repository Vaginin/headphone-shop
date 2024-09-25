import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from "../products/products.component";
import { WiredHeadphonesComponent } from "../products/wired-headphones/wired-headphones.component";
import { WirelessHeadphonesComponent } from "../products/wireless-headphones/wireless-headphones.component";
import { HeadphonesService } from '../../services/products.service';
import { Headphone } from '../models/product';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  imports: [
    MatCardModule,
    ProductsComponent,
    WiredHeadphonesComponent,
    WirelessHeadphonesComponent
  ],
  standalone: true,
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  basket: Headphone[];
  basketSubscription: Subscription
  totalPrice: number;
  count: number = 0;
  constructor(
    private _headphoneService: HeadphonesService
  ) { }

  ngOnInit(): void {
    this._headphoneService.basket$.subscribe(basket => {
      this.count = basket.reduce((total, product) => total + product.quantity, 0);
    });
  }
}


