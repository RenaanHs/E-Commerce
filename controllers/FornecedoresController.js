class FornecedoresController {
    constructor(fornecedoresService) {
        this.fornecedoresService = fornecedoresService;
    }

    // Criar um novo fornecedor
    async createFornecedor(req, res) {
        try {
            const { nome, cnpj, email, telefone, endereco } = req.body;
            const fornecedorData = { nome, cnpj, email, telefone, endereco };

            const newFornecedor = await this.fornecedoresService.create(fornecedorData);
            res.status(201).json(newFornecedor);
        } catch (error) {
            console.error('Erro ao criar o fornecedor:', error);
            res.status(500).json({ error: 'Erro ao criar o fornecedor.' });
        }
    }

    // Listar todos os fornecedores
    async listFornecedores(req, res) {
        try {
            const fornecedores = await this.fornecedoresService.findAll();
            res.status(200).json(fornecedores);
        } catch (error) {
            console.error('Erro ao listar fornecedores:', error);
            res.status(500).json({ error: 'Erro ao listar fornecedores.' });
        }
    }

    // Atualizar um fornecedor existente
    async updateFornecedor(req, res) {
        const { id } = req.params;
        try {
            const fornecedorAtualizado = await this.fornecedoresService.update(id, req.body);
            if (!fornecedorAtualizado) {
                return res.status(404).json({ error: 'Fornecedor não encontrado.' });
            }
            res.status(200).json(fornecedorAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar o fornecedor:', error);
            res.status(500).json({ error: 'Erro ao atualizar o fornecedor.' });
        }
    }

    // Deletar um fornecedor existente
    async deleteFornecedor(req, res) {
        const { id } = req.params;
        try {
            const fornecedorDeletado = await this.fornecedoresService.delete(id);
            if (!fornecedorDeletado) {
                return res.status(404).json({ error: 'Fornecedor não encontrado.' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir o fornecedor:', error);
            res.status(500).json({ error: 'Erro ao excluir o fornecedor.' });
        }
    }
}

module.exports = FornecedoresController;