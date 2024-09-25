import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadphonesService } from '../../../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {


  constructor(private _headphonesService: HeadphonesService,
    private cdr: ChangeDetectorRef
  ) { }

  count: number;

  ngOnInit() {
    this._headphonesService.getTotalQuantity().subscribe(totalQuantity => {
      this.count = totalQuantity;
      this.cdr.markForCheck();
    });
    this._headphonesService.basket$.subscribe(basket => {
      this.count = basket.reduce((total, product) => total + product.quantity, 0);
      this.cdr.markForCheck();
    });
    this.cdr.markForCheck();
  }
}
