const { Products } = require('../models');

class ProductProvider {
  async createProduct(productData) {
    return await Products.create(productData);
  }
  async getProducts(filterData){
    console.log('filterData: ', filterData);
    return await Products.findAll({
      where:{
        hsn_code: filterData?.hsn_code,
        user_id : filterData?.user_id
      }
    })
  }
}

module.exports = new ProductProvider();
