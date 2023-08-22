import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import {
  selectProducts,
  selectProductsErrorMessage,
  selectProductsLoading,
  selectProductsShowProductCode,
  selectProductsTotal,
} from '../state/products.selectors';
import { ProductsStore } from '../peoducts.store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers:[ProductsStore]
})
export class ProductsPageComponent {
  products$ = this.productsStore.products$;
  total$ = this.store.select(selectProductsTotal);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  loading$ = this.store.select(selectProductsLoading);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store,private productsStore:ProductsStore) {}
  ngOnInit(){
    this.productsStore.getProducts();
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
