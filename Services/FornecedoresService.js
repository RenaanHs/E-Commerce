class FornecedoresService {
    constructor(fornecedorModel) {
        this.fornecedorModel = fornecedorModel;
    }

    // Criar fornecedor
    async create(fornecedorData) {
        return await this.fornecedorModel.create(fornecedorData);
    }

    // Listar todos os fornecedores
    async findAll() {
        return await this.fornecedorModel.findAll();
    }

    // Atualizar um fornecedor
    async update(id, data) {
        const fornecedor = await this.fornecedorModel.findByPk(id);
        if (!fornecedor) {
            throw new Error('Fornecedor não encontrado.');
        }
        return await fornecedor.update(data);
    }

    // Deletar um fornecedor
    async delete(id) {
        const fornecedor = await this.fornecedorModel.findByPk(id);
        if (!fornecedor) {
            throw new Error('Fornecedor não encontrado.');
        }
        return await fornecedor.destroy();
    }
}

module.exports = FornecedoresService;