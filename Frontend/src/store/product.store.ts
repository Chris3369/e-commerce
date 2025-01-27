import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../lib/axios'
import { RootState } from "./index"

export type Product = {
    _id?: string,
    name: string,
    description: string,
    price: number,
    base64Image: string | ArrayBuffer | null,
    category: string,
    isFeatured: boolean
}

type State = {
    products: Product[],
    status: "idle" | "loading" | "succeeded" | "failed",
    error: any
}

const initialState: State = {
    products: [],
    status: 'idle',
    error: null
}

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    try {
        const response = await axios.get("/products")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const createProduct = createAsyncThunk("product/createProduct", async (product: Product) => {
    try {
        const response = await axios.post("/products", product)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

            .addCase(createProduct.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.products.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const getAllProducts = (state: RootState) => state.product

export default productSlice.reducer