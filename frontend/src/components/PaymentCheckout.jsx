import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../api';

const PaymentCheckout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para limpar o carrinho
  const clearCart = async () => {
    try {
      await cartAPI.clearCart(); // Supondo que a API tenha um endpoint para limpar o carrinho
    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simula a finalização da compra
    try {
      // Exibir a mensagem de sucesso
      setSuccessMessage('Compra realizada com sucesso!');

      // Limpar o carrinho após a "finalização" do pagamento
      await clearCart();

      // Redirecionar para a página de produtos
      navigate('/products');
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Checkout</h2>

      {successMessage && (
        <div className="text-green-600 font-semibold">{successMessage}</div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Método de Pagamento</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="CREDIT_CARD">Cartão de Crédito</option>
            <option value="PIX">PIX</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Processando...' : 'Finalizar Compra'}
        </button>
      </div>
    </div>
  );
};

export default PaymentCheckout;
