const db = require('../models');
const { Cart, Product } = db;

const CartController = {
    async addToCart(req, res) {
        try {
            const { productId, quantidade } = req.body;

            if (!productId || !quantidade) {
                return res.status(400).json({
                    error: 'ProductId e quantidade são obrigatórios'
                });
            }

            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    error: 'Produto não encontrado'
                });
            }

            if (product.estoque < quantidade) {
                return res.status(400).json({
                    error: 'Quantidade solicitada indisponível em estoque',
                    estoqueDisponivel: product.estoque
                });
            }

            let cartItem = await Cart.findOne({
                where: { productId }
            });

            if (cartItem) {
                cartItem.quantidade += quantidade;
                await cartItem.save();
            } else {
                cartItem = await Cart.create({
                    productId,
                    quantidade
                });
            }

            const updatedItem = await Cart.findOne({
                where: { id: cartItem.id },
                include: [{
                    model: Product,
                    attributes: ['nome', 'preco', 'estoque']
                }]
            });

            res.status(200).json({
                message: 'Produto adicionado ao carrinho com sucesso',
                item: updatedItem
            });

        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            res.status(500).json({
                error: 'Erro ao adicionar item ao carrinho'
            });
        }
    },

    async removeFromCart(req, res) {
        try {
            const { id } = req.params;
    
            // Verifica se o ID é um número válido
            if (isNaN(id)) {
                return res.status(400).json({
                    error: 'ID inválido. Deve ser um número.'
                });
            }
    
            const deleted = await Cart.destroy({
                where: { id }
            });
    
            if (deleted) {
                res.status(200).json({
                    message: 'Item removido do carrinho com sucesso'
                });
            } else {
                res.status(404).json({
                    error: 'Item não encontrado no carrinho'
                });
            }
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
            res.status(500).json({
                error: 'Erro ao remover item do carrinho'
            });
        }
    },
    

    async updateQuantity(req, res) {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;

            if (!quantidade || quantidade < 1) {
                return res.status(400).json({
                    error: 'Quantidade inválida'
                });
            }

            const cartItem = await Cart.findByPk(id, {
                include: [Product]
            });

            if (!cartItem) {
                return res.status(404).json({
                    error: 'Item não encontrado no carrinho'
                });
            }

            if (cartItem.Product.estoque < quantidade) {
                return res.status(400).json({
                    error: 'Quantidade solicitada indisponível em estoque',
                    estoqueDisponivel: cartItem.Product.estoque
                });
            }

            cartItem.quantidade = quantidade;
            await cartItem.save();

            res.status(200).json({
                message: 'Quantidade atualizada com sucesso',
                item: cartItem
            });

        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            res.status(500).json({
                error: 'Erro ao atualizar quantidade do item'
            });
        }
    },

    async getCart(req, res) {
        try {
            const cartItems = await Cart.findAll({
                include: [{
                    model: Product,
                    attributes: ['nome', 'preco', 'estoque']
                }],
                order: [['id', 'ASC']]
            });

            const total = cartItems.reduce((acc, item) => {
                return acc + (item.Product.preco * item.quantidade);
            }, 0);

            res.status(200).json({
                items: cartItems,
                total: total,
                quantidade: cartItems.length
            });
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
            res.status(500).json({
                error: 'Erro ao buscar itens do carrinho'
            });
        }
    }
};

module.exports = CartController;