const { User } = require('../models');
const bcrypt = require('bcryptjs');

class UserService {
    async create(email, password, data_nasc) {
        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);
        
        return User.create({
            email,
            password: hashedPassword,
            data_nasc
        });
    }

    async findByEmail(email) {
        return User.findOne({ 
            where: { email } 
        });
    }

    async findById(id) {
        return User.findByPk(id);
    }
}

module.exports = new UserService();

