import { createAction, createReducer,on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductsState{
    showProductCode:boolean;
    loading:boolean,
    products:Product[],
    errorMessage:String
}
const initialState: ProductsState ={
    showProductCode:true,
    loading:false,
    products:[],
    errorMessage:"",
}
export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProcutCode,(state)=>({
        ...state,
        showProductCode:!state.showProductCode,

    })),
    on(ProductsPageActions.loadProducts,state => ({
    ...state,
    loading:true,
    products:[],
    errorMessage:"",
    })),
    on(ProductsAPIActions.productsLoadedSuccess,(state,{products})=>({
        ...state,
        loading:false,
        products:products

    })),
    on(ProductsAPIActions.productsLoadedFail,(state,{message})=>({
        ...state,
        products:[],
        errorMessage:message,
        loading:false,
    })),
    on(ProductsPageActions.addProduct,(state,{product})=>({
        ...state,
        errorMessage:'',
        loading:true,
    })),
    on(ProductsAPIActions.productsAddedSuccess,(state,{product})=>({
        ...state,
        products:[...state.products,product],
        errorMessage:'',
        loading:false,
    })),
    on(ProductsAPIActions.productsAddedFail,(state,{message})=>({
        ...state,
        errorMessage:message,
        loading:false,
    })),
    on(ProductsPageActions.updateProduct,(state,{product})=>({
        ...state,
        errorMessage:'',
        loading:true,
    })),
    on(ProductsAPIActions.productsUpdateSuccess,(state,{product})=>({
        ...state,
        products:state.products.map(eachProduct=> eachProduct.id===product.id?product:eachProduct),
        errorMessage:'',
        loading:false,
    })),
    on(ProductsAPIActions.productsUpdateFail,(state,{message})=>({
        ...state,
        errorMessage:message,
        loading:false,
    })),
    on(ProductsPageActions.deleteProduct,(state,{id})=>({
        ...state,
        errorMessage:'',
        loading:true,
    })),
    on(ProductsAPIActions.productsDeleteSuccess,(state,{id})=>({
        ...state,
        products:state.products.filter(eachProduct=> eachProduct.id!==id),
        errorMessage:'',
        loading:false,
    })),
    on(ProductsAPIActions.productsDeleteFail,(state,{message})=>({
        ...state,
        errorMessage:message,
        loading:false,
    }))

);