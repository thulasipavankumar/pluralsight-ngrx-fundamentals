import { createAction, createReducer,on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { ProductsRoutingModule } from "../products-routing.module";

export interface ProductsState extends EntityState<Product>{
    showProductCode:boolean;
    loading:boolean,
    errorMessage:String
}
const adapter:EntityAdapter<Product> = createEntityAdapter<Product>({});
const initialState: ProductsState =adapter.getInitialState({
    showProductCode:true,
    loading:false,
    errorMessage:"",
    
})
export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProcutCode,(state)=>({
        ...state,
        showProductCode:!state.showProductCode,

    })),
    on(ProductsPageActions.loadProducts,state => adapter.setAll([],{
    ...state,
    loading:true,
    errorMessage:"",
    })),
    on(ProductsAPIActions.productsLoadedSuccess,(state,{products})=> adapter.setAll([],{
        ...state,
        loading:false,

    })),
    on(ProductsAPIActions.productsLoadedFail,(state,{message})=>adapter.setAll([],{
        ...state,
        errorMessage:message,
        loading:false,
    })),
    on(ProductsPageActions.addProduct,(state,{product})=>({
        ...state,
        errorMessage:'',
        loading:true,
    })),
    on(ProductsAPIActions.productsAddedSuccess,(state,{product})=>adapter.addOne(product,{
        ...state,
        errorMessage:'',
        loading:false,
    })),
    on(ProductsAPIActions.productsAddedFail,(state,{message})=>({
        ...state,
        errorMessage:message,
        loading:false,
    })),
    on(ProductsPageActions.updateProduct,(state)=>({
        ...state,
        errorMessage:'',
        loading:true,
    })),
    on(ProductsAPIActions.productsUpdateSuccess,(state,{update})=>
    adapter.updateOne(update,{
        ...state,

        loading:false,
    })),
    on(ProductsAPIActions.productsUpdateFail,(state,{message})=>({
        ...state,
        errorMessage:message,
        loading:false,
    })),
    on(ProductsPageActions.deleteProduct,(state,{id})=>({
        ...state,
        loading:true,
    })),
    on(ProductsAPIActions.productsDeleteSuccess,(state,{id})=>adapter.removeOne(id,{
        ...state,
        loading:false,
    })),
    on(ProductsAPIActions.productsDeleteFail,(state,{message})=>({
        ...state,
        errorMessage:message,
        loading:false,
    }))

);