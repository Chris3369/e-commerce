import { useState, useRef } from 'react'
import { useDispatch } from "react-redux"
import { styled } from 'styled-components'
import { AppDispatch } from "../store"
import { createProduct } from "../store/product.store"
import type { Product } from "../store/product.store"

const CreateProduct = () => {
  const dispatch = useDispatch<AppDispatch>()

  const inputImageRef = useRef<HTMLInputElement>(null)

  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    base64Image: "",
    isFeatured: false
  })

  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createProduct(product))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(files[0])
        setProduct({ ...product, base64Image: reader.result })
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input
            id='name'
            type="text"
            name="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <input
            id='description'
            type="text"
            name="description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        </div>
        <div>
          <label htmlFor="price">price</label>
          <input
            id='price'
            type="number"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />
        </div>
        <div>
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            <option value="Shoes">Shoes</option>
            <option value="Clothes">Clothes</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div>
          <Input
            type="file"
            name="image"
            ref={inputImageRef}
            onChange={handleImageChange} />
          <button type='button' onClick={() => inputImageRef.current?.click()}>Upload</button>
          {image && <img src={URL.createObjectURL(image)} alt="preview" />}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateProduct

const Input = styled.input`
  display: none;
`


// e.target.files![0] => 告訴 TS，這個變數不會是 null 或 undefined