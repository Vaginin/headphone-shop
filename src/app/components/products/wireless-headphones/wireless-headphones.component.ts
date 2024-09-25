import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Headphone } from '../../models/product';
import { HeadphonesService } from '../../../services/products.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wireless-headphones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wireless-headphones.component.html',
  styleUrl: './wireless-headphones.component.scss'
})
export class WirelessHeadphonesComponent {
  headphonesData: Headphone[];
  basket: Headphone[];
  basketSubscription: Subscription;

  constructor(private _headphonesService: HeadphonesService) { }

  ngOnInit(): void {
    this._headphonesService.getWirelessHeadphones().subscribe(
      (data: Headphone[]) => {
        this.headphonesData = data;
      }
    );

    this.basketSubscription = this._headphonesService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  addToBasket(product: Headphone) {
    product.quantity = 1;
    product.totalCardPrice = product.price;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) {
        this.updateToBasket(findItem)
      } else this.postToBasket(product);
    }

    else this.postToBasket(product);

  }

  postToBasket(product: Headphone) {
    this._headphonesService.postProductToBasket(product).subscribe((data) => {
      this.basket.push(data);
    })
  }

  updateToBasket(product: Headphone) {
    product.quantity += 1;
    product.totalCardPrice += product.price;
    this._headphonesService.updateProductInBasket(product).subscribe(() => {
      // Здесь вы можете дополнительно обработать успешное обновление, если нужно
    });
  }
}
