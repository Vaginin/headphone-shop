import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headphone } from '../components/models/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeadphonesService {
  private wiredUrl = 'http://localhost:3000/wiredHeadphones';
  private wirelessUrl = 'http://localhost:3000/wirelessHeadphones';
  private basketUrl = 'http://localhost:3000/basket';

  private basketSubject = new BehaviorSubject<Headphone[]>([]);
  basket$ = this.basketSubject.asObservable();

  constructor(private http: HttpClient) { }

  getWiredHeadphones(): Observable<Headphone[]> {
    return this.http.get<Headphone[]>(this.wiredUrl);
  }

  getWirelessHeadphones(): Observable<Headphone[]> {
    return this.http.get<Headphone[]>(this.wirelessUrl);
  }

  postProductToBasket(product: Headphone): Observable<Headphone> {
    return this.http.post<Headphone>(this.basketUrl, product).pipe(
      map((newProduct) => {
        this.updateBasket(newProduct);
        return newProduct;
      })
    );
  }

  deleteProductFromBasket(product: Headphone): Observable<Headphone> {
    return this.http.delete<Headphone>(`${this.basketUrl}/${product.id}`).pipe(
      map(() => {
        this.removeFromBasket(product);
        return product;
      })
    );
  }

  getProductFromBasket(): Observable<Headphone[]> {
    return this.http.get<Headphone[]>(this.basketUrl).pipe(
      map(products => {
        this.basketSubject.next(products);
        return products;
      })
    );
  }

  updateProductInBasket(product: Headphone): Observable<Headphone> {
    return this.http.put<Headphone>(`${this.basketUrl}/${product.id}`, product).pipe(
      map(updatedProduct => {
        this.updateBasket(updatedProduct);
        return updatedProduct;
      })
    );
  }

  getTotalBasketPrice(): Observable<number> {
    return this.basket$.pipe(
      map(products =>
        products.reduce((total, product) => total + product.totalCardPrice, 0)
      )
    );
  }

  getTotalQuantity(): Observable<number> {
    return this.basket$.pipe(
      map(products =>
        products.reduce((total, product) => total + product.quantity, 0)
      )
    );
  }

  private updateBasket(updatedProduct: Headphone) {
    const currentBasket = this.basketSubject.getValue();
    const updatedBasket = currentBasket.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.basketSubject.next(updatedBasket);
  }

  private removeFromBasket(product: Headphone) {
    const currentBasket = this.basketSubject.getValue();
    const updatedBasket = currentBasket.filter(p => p.id !== product.id);
    this.basketSubject.next(updatedBasket);
  }
}
