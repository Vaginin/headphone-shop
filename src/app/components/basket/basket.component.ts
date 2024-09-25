import { Component } from '@angular/core';
import { Headphone } from '../models/product';
import { elementAt, Subscription } from 'rxjs';
import { HeadphonesService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true,
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basket: Headphone[];
  basketSubscription: Subscription
  totalPrice: number;
  constructor(
    private _headphoneService: HeadphonesService
  ) { }

  ngOnInit(): void {
    this.basketSubscription = this._headphoneService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    })
    this._headphoneService.getTotalBasketPrice().subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });
  }


  deleteProduct(product: Headphone) {
    this._headphoneService.deleteProductFromBasket(product).subscribe((data) => {
      this.basket = this.basket.filter((p) => p.id !== product.id);
    })
  }

  minusItem(item: Headphone) {
    if (item.quantity <= 1) {
      this.deleteProduct(item);
      return;
    } else {
      item.quantity -= 1;
      item.totalCardPrice -= item.price;
      this._headphoneService.updateProductInBasket(item).subscribe((data) => {
      })
    }
  }

  plusItem(item: Headphone) {
    item.quantity += 1;
    item.totalCardPrice += item.price;
    this._headphoneService.updateProductInBasket(item).subscribe((data) => {
    })
  }
}
