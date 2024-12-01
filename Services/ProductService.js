class ProductService {
     constructor() {
            this.Product = require('../models/Product');
        }
    
    async create(nome, descricao, preco, estoque) {
            return await this.Product.create({ nome, descricao, preco, estoque });
        }

    async findAll() {
        return await this.Product.findAll();
    }

    async update(id, nome, descricao, preco, estoque) {
        const product = await this.Product.findByPk(id);
        if (!product) return null;
        return await product.update({ nome, descricao, preco, estoque });
    }

    async delete(id) {
        const product = await this.Product.findByPk(id);
        if (product) {
            return await product.destroy();
        }
        return null;
    }
}

module.exports = ProductService;
