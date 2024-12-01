const Product = require('../models/Product');


exports.createProduct = async (req, res) => {
    try {
        const { nome, descricao, preco, estoque } = req.body;
        const newProduct = await Product.create({ nome, descricao, preco, estoque });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar produto.' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params; 
    const { nome, descricao, preco, estoque } = req.body;

    try {
        const updatedProduct = await Product.update({ nome, descricao, preco, estoque }, {
            where: { id }
        });

        if (updatedProduct[0] === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.destroy({
            where: { id }
        });

        if (deletedProduct === 0) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
};

