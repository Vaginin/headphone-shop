import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeadphonesService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [
    CommonModule
  ],
  standalone: true,
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(private headphonesService: HeadphonesService) { }



}
