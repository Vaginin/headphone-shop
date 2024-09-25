import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Headphone } from '../../models/product';
import { HeadphonesService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  standalone: true,
  styleUrl: './dialog-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogBoxComponent {

  product: Headphone;
  basket: Headphone[];
  basketSubscription: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Headphone,
    private _headphoneService: HeadphonesService,
    private dialog: MatDialogRef<DialogBoxComponent>
  ) { }

  ngOnInit(): void {
    this._headphoneService.getWiredHeadphones().subscribe((data: Headphone[]) => {
    })
    this.basketSubscription = this._headphoneService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    })
    this.product = this.data;
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
    this._headphoneService.postProductToBasket(product).subscribe((data) => {
      this.basket.push(data);
    })
  }

  updateToBasket(product: Headphone) {
    product.quantity += 1;
    product.totalCardPrice += product.price;
    this._headphoneService.updateProductInBasket(product).subscribe(() => {
    });
  }

  close() {
    this.dialog.close();
  }
}
