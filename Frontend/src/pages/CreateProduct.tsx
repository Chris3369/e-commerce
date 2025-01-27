import { useState } from 'react'

const CreateProduct = () => {

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
   
    
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateProduct