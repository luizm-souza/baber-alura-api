const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { client } = require('../models/index');

class ClientController {

  static async createClient(req, res) {
    const { name, document, email, password, phone } = req.body;
    try {
      const emailExists = await client.findOne({where: {email: email}})
      const documentExists = await client.findOne({where: {document: document}})

      if(typeof password != 'string'){
        return res.status(401).json({erro: `A senha só pode ser string`})
      }

      if(name === "" || document === "" || email === "" || password === "" || phone === ""){
        res.status(401).json({erro: `Nenhum dos campos pode ser vazio`})
      }

      if(emailExists){
        return res.status(401).json({erro: `Email já existente`})
      }

      if(documentExists){
        return res.status(401).json({erro: `CPF já existente`})
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newClient = await client.create({
        name,
        document,
        email,
        password: hashedPassword,
        phone
      });

      return res.status(200).json(newClient);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteClient(req, res) {
    
    const clientId = req.user.sub;
    try {
      await client.destroy({
        where: {
          id: Number(clientId)
        }
      });
      return res.status(200).json(`O usuário de Id ${clientId} foi deletado com sucesso`);
    } catch (error) {
      console.log('teste')
      return res.status(500).json(error.message);
    }
  }

  static async loginClient(req, res){
    const { email, password } = req.body;

    try {
      const user = await client.findOne({ where: { email: email } });

      if (!user) {
        console.log('teste')
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const isPasswordValid = await comparePwd(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = await generateToken({ sub: user.id });

      return res.status(200).json({ message: "Login efetuado com sucesso", token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

async function comparePwd(pwd, hashPwd) {
  return await bcrypt.compare(pwd, hashPwd);
}

async function generateToken(payload) {
  const secretKey = process.env.CHAVE_JWT;
  const optionsToken = { expiresIn: '60m' };
  return jwt.sign(payload, secretKey, optionsToken);
}

module.exports = { ClientController, comparePwd, generateToken };
