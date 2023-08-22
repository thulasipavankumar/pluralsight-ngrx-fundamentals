import { Injectable } from "@angular/core";
import { ProductsService } from "../products.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { map,concatMap, catchError,of } from "rxjs";



@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions,
        private productsService: ProductsService) { }
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.loadProducts),
            concatMap(() =>
                this.productsService
                    .getAll()
                    .pipe(
                        map((products) =>
                            ProductsAPIActions.productsLoadedSuccess({ products })
                        ),
                        catchError(
                            (error)=>of(ProductsAPIActions.productsLoadedFail({message:error}))
                        )
                    )
            ))
    );

}