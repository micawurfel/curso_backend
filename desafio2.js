const fs=require('fs')
const path=require("path")

class ProductManager{
  constructor(productsPath){
    this.path=productsPath
  }

  async getProducts(){
    if (fs.existsSync(this.path)) {
      return JSON.parse(await fs.promises.readFile(this.path, {encoding: 'utf-8'}))
    }else{
      return []
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock){
    let products = await this.getProducts()

    let codeExist = products.find(product => product.code===code)
    if(codeExist){
      console.log(`El producto con el codigo ${code} ya existe`)
      return 
    }
    
    let id=1
    if(products.length>0){
      id=products[products.length-1].id +1
    }

    let newProduct={id, title, description, price, thumbnail, code, stock}
    products.push(newProduct)

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
  }

  async getProductById(id) {
    let products = await this.getProducts();
    let findId = products.find(product => product.id === id);
    if (!findId) {
      throw new Error(`El producto con el id ${id} no existe`);
    }
    return findId;
  }

  async updateProduct(id, updated) {
    let products = await this.getProducts();
    let findId = products.findIndex(product => product.id === id);
    if (findId === -1) {
      throw new Error(`El producto con el id ${id} no existe`);
    }

    products[findId] = { ...products[findId], ...updated };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    let findId = products.findIndex(product => product.id === id);
    if (findId === -1) {
      throw new Error(`El producto con el id ${id} no existe`);
    }

    products.splice(findId, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
  }
}


(async () => {
  const productsPath = './products.json'
  const product = new ProductManager(productsPath)

  console.log(await product.getProducts())

  await product.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25);
  await product.addProduct('test1', '....', 34, 'sin imagen', 'abb435', 2)
  await product.addProduct('test2', '....', 63, 'sin imagen', 'dsw862', 123)

  console.log(await product.getProducts())

  console.log(await product.getProductById(2))

  await product.updateProduct(2, { description: 'soy una descripcion'})
  console.log(await product.getProductById(2))

  await product.deleteProduct(3)
  console.log(await product.getProducts())

})()

