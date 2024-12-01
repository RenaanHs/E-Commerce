class UserController {
    constructor(UserService) {
        this.userService = UserService; // Corrigido o nome para 'userService'
    }

    async createUser(req, res) {
        const { email,  password, data_nasc, } = req.body;
        try {
            const newUser = await this.userService.create(email, password, data_nasc); // Corrigido: await e passando os parâmetros corretamente
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao gravar um novo usuário.' });
        }
    }

    async findAllUsers(req, res) {
        try {
            const AllUsers = await this.userService.findAll();
            res.status(200).json(AllUsers);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar todos os usuários.' });
        }
    }

    async findUserById(req, res) {
        const { id } = req.query;
        try {
            const User = await this.userService.findById(id);
            res.status(200).json(User);
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar o usuário pelo ID.' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.userService.login(email, password); // Corrigido: await e passando os parâmetros corretamente
            res.status(200).json(user); // Retornando 'user' ao invés de 'User' que está errado
        } catch (error) {
            res.status(500).json({ error: 'Erro ao logar o usuário' });
        }
    }
}

module.exports = UserController;
