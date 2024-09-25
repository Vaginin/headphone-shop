import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Headphone } from '../../models/product';
import { HeadphonesService } from '../../../services/products.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogBoxComponent } from '../../UI/dialog-box/dialog-box.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-wired-headphones',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './wired-headphones.component.html',
  styleUrl: './wired-headphones.component.scss'
})
export class WiredHeadphonesComponent {
  headphonesData: Headphone[];

  basket: Headphone[];
  basketSubscription: Subscription;

  constructor(private _headphonesService: HeadphonesService,
    private dialog: MatDialog
  ) { }

  openProductDetailModal(product: Headphone) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: product,
      width: '600px',
      minHeight: "auto"
    });
    this._headphonesService.getWiredHeadphones().subscribe((data) => { })
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
    });
  }

  ngOnInit(): void {
    this._headphonesService.getWiredHeadphones().subscribe(
      (data: Headphone[]) => {
        this.headphonesData = data;
      }
    );

    this.basketSubscription = this._headphonesService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }
}
