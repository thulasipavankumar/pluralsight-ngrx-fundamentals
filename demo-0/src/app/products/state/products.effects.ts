import { Injectable } from "@angular/core";
import { ProductsService } from "../products.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { map,concatMap, catchError,of, exhaustMap, mergeMap } from "rxjs";



@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions,
        private productsService: ProductsService) { }
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.loadProducts),
            exhaustMap(() =>
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
    addProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.addProduct),
            mergeMap(({product}) =>
                this.productsService.add(product).pipe(
                        map((newProduct) =>
                            ProductsAPIActions.productsAddedSuccess({ product:newProduct })
                        ),
                        catchError(
                            (error)=>of(ProductsAPIActions.productsLoadedFail({message:error}))
                        )
                    )
            ))
    );
    updateProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.updateProduct),
            concatMap(({product}) =>
                this.productsService.update(product).pipe(
                        map(() =>
                            ProductsAPIActions.productsUpdateSuccess({ product })
                        ),
                        catchError(
                            (error)=>of(ProductsAPIActions.productsUpdateFail({message:error}))
                        )
                    )
            ))
    );
    deleteProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsPageActions.deleteProduct),
            mergeMap(({id}) =>
                this.productsService.delete(id).pipe(
                        map(() =>
                            ProductsAPIActions.productsDeleteSuccess({ id })
                        ),
                        catchError(
                            (error)=>of(ProductsAPIActions.productsDeleteFail({message:error}))
                        )
                    )
            ))
    );

}