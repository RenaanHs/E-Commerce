const db = require('../models');
const { Transaction, Cart, Product, User } = db;

class PaymentService {
    constructor() {
        this.Transaction = Transaction;
        this.Cart = Cart;
        this.Product = Product;
        this.User = User;
    }

    async validateCart(userId) {
        const cartItems = await this.Cart.findAll({
            where: { userId },
            include: [{
                model: this.Product,
                attributes: ['nome', 'preco', 'estoque']
            }]
        });

        if (cartItems.length === 0) {
            throw new Error('Carrinho vazio');
        }

        return cartItems;
    }

    calculateTotal(cartItems) {
        return cartItems.reduce((total, item) => {
            return total + (item.quantidade * item.Product.preco);
        }, 0);
    }

    generatePixCode() {
        return `PIX${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    async validateCardPayment(cardData) {
        const { cardNumber, cvv, expirationDate, cardHolderName } = cardData;
        
        if (!cardNumber || !cvv || !expirationDate || !cardHolderName) {
            throw new Error('Dados do cartão incompletos');
        }

        // Aqui você pode adicionar validações específicas do cartão
        // como validação do número, data de expiração, etc.
    }

    async processPayment(userId, metodoPagamento, paymentDetails = {}) {
        const user = await this.User.findByPk(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const cartItems = await this.validateCart(userId);
        const valorTotal = this.calculateTotal(cartItems);

        let transactionData = {
            userId,
            valorTotal,
            metodoPagamento,
            status: 'PENDING'
        };

        if (metodoPagamento === 'CREDIT_CARD') {
            await this.validateCardPayment(paymentDetails);
            transactionData.status = 'PROCESSING';
            transactionData.paymentDetails = {
                lastDigits: paymentDetails.cardNumber.slice(-4),
                cardHolderName: paymentDetails.cardHolderName,
                installments: paymentDetails.installments || 1
            };
        } else if (metodoPagamento === 'PIX') {
            const pixCode = this.generatePixCode();
            transactionData.pixCode = pixCode;
            transactionData.paymentDetails = {
                pixExpirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
            };
        }

        const transaction = await this.Transaction.create(transactionData);

        // Simular processamento assíncrono
        this.processPaymentAsync(transaction.id, cartItems, userId);

        return transaction;
    }

    async processPaymentAsync(transactionId, cartItems, userId) {
        setTimeout(async () => {
            try {
                const transaction = await this.Transaction.findByPk(transactionId);
                
                // Simular sucesso do pagamento
                await transaction.update({ status: 'COMPLETED' });

                // Atualizar estoque
                for (const item of cartItems) {
                    await this.Product.decrement('estoque', {
                        by: item.quantidade,
                        where: { id: item.Product.id }
                    });
                }

                // Limpar carrinho
                await this.Cart.destroy({ where: { userId } });
            } catch (error) {
                console.error('Erro no processamento assíncrono:', error);
                const transaction = await this.Transaction.findByPk(transactionId);
                await transaction.update({ status: 'FAILED' });
            }
        }, 2000);
    }

    async getTransactionStatus(transactionId) {
        const transaction = await this.Transaction.findByPk(transactionId, {
            include: [{
                model: this.User,
                attributes: ['email']
            }]
        });

        if (!transaction) {
            throw new Error('Transação não encontrada');
        }

        return transaction;
    }
}

module.exports = PaymentService;