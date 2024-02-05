class ProductManger{
  constructor(){
    this.products=[]
  }

  addProduct(title, description, price, thumbnail, code, stock){
    let codeExist = this.products.find(product => product.code===code)
    if(codeExist){
      console.log(`El producto con el codigo ${code} ya existe`)
      return 
    }
    

    let id=1
    if(this.products.length>0){
      id=this.products[this.products.length-1].id +1
    }

    let newProduct={id, title, description, price, thumbnail, code, stock}
    this.products.push(newProduct)
    return
  }

  getProducts(){
    return this.products
  }

  getProductById(id){
    let findId = this.products.find(product => product.id===id)
    if(!findId){
      console.log(`El producto con el id ${id} no existe`)
      return
    }

    return findId
  }
}

let product = new ProductManger()
console.log(product.getProducts())

product.addProduct('producto prueba', 'este producto es una prueba', 200, 'sin imagen', 'abc123', 25)
console.log(product.getProducts())

product.addProduct('test1', '....', 34, 'sin imagen', 'abb435', 2)
product.addProduct('producto prueba', 'este producto es una prueba', 200, 'sin imagen', 'abc123', 25)
product.addProduct('test2', '....', 63, 'sin imagen', 'dsw862', 123)
console.log(product.getProducts())

console.log(product.getProductById(1))



