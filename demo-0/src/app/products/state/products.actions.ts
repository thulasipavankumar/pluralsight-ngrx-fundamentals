import { createAction,createActionGroup,emptyProps,props } from "@ngrx/store"
import { Product } from "../product.model";

// export const loadProducts = createAction('[Prodcuts Page] Load Products')
// export const toggleProducts = createAction('[Prodcuts Page] Toggle Show Procut Code')

// export const productsLoadedSuccess = createAction('[Prodcuts API] Products Loaded Success',
// props<{ products: Product[] }>);

// export const productsLoadedFail = createAction('[Prodcuts API] Products Loaded Fail',
// props<{ message: string }>);

export const ProductsPageActions = createActionGroup({
    source:'Products Page',
    events:{
        'Toggle Show Procut Code':emptyProps(),
        'Load Products':emptyProps(),
        'Add Product':props<{ product: Product }>(),
        'Update Product':props<{ product: Product }>(),
        'Delete Product':props<{ id: number }>(),
       },
});
export const ProductsAPIActions = createActionGroup({
    source:'Products API',
    events:{
        'Products Loaded Success':props<{ products: Product[] }>(),
        'Products Loaded Fail':props<{ message: string }>(),
        'Products Added Success':props<{ product: Product }>(),
        'Products Added Fail':props<{ message: string }>(),
        'Products Update Success':props<{ product: Product }>(),
        'Products Update Fail':props<{ message: string }>(),
        'Products Delete Success':props<{ id: number }>(),
        'Products Delete Fail':props<{ message: string }>(),
       },
});