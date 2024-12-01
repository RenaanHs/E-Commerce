class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    async processCardPayment(req, res) {
        try {
            const { 
                cardNumber, 
                cvv, 
                expirationDate, 
                cardHolderName, 
                userId,
                installments 
            } = req.body;

            const transaction = await this.paymentService.processPayment(
                userId,
                'CREDIT_CARD',
                {
                    cardNumber,
                    cvv,
                    expirationDate,
                    cardHolderName,
                    installments
                }
            );

            res.status(200).json({
                message: 'Pagamento em processamento',
                transactionId: transaction.id
            });
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            res.status(error.message === 'Carrinho vazio' || error.message === 'Usuário não encontrado' ? 400 : 500)
                .json({ error: error.message || 'Erro ao processar pagamento' });
        }
    }

    async processPixPayment(req, res) {
        try {
            const { userId } = req.body;

            const transaction = await this.paymentService.processPayment(
                userId,
                'PIX'
            );

            res.status(200).json({
                message: 'Código PIX gerado com sucesso',
                pixCode: transaction.pixCode,
                transactionId: transaction.id,
                valorTotal: transaction.valorTotal,
                expirationDate: transaction.paymentDetails.pixExpirationDate
            });
        } catch (error) {
            console.error('Erro ao gerar PIX:', error);
            res.status(error.message === 'Carrinho vazio' || error.message === 'Usuário não encontrado' ? 400 : 500)
                .json({ error: error.message || 'Erro ao gerar pagamento PIX' });
        }
    }

    async getTransactionStatus(req, res) {
        try {
            const { id } = req.params;
            const transaction = await this.paymentService.getTransactionStatus(id);

            res.status(200).json({
                transactionId: transaction.id,
                status: transaction.status,
                metodoPagamento: transaction.metodoPagamento,
                valorTotal: transaction.valorTotal,
                paymentDetails: transaction.paymentDetails,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt,
                userEmail: transaction.User.email
            });
        } catch (error) {
            console.error('Erro ao buscar status da transação:', error);
            res.status(error.message === 'Transação não encontrada' ? 404 : 500)
                .json({ error: error.message || 'Erro ao buscar status da transação' });
        }
    }
}

module.exports = PaymentController;