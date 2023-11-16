const express = require('express');
const router = express.Router();
const TITLE = 'Usuários Cadastrados';
const database = require('../database');
const yup = require('yup');
const bcrypt = require('bcryptjs');
const pagination = require('../addional/pagination')

router.get("/usuarios", async (req, res, next) => {
    try {
        const dadosPaginados = await pagination(database, 'usuarios', req, 'nome_completo');
        console.log(dadosPaginados);
        const paginas = {
            actual: parseInt(dadosPaginados.numeroPagina) > dadosPaginados.totalPaginas ? dadosPaginados.totalPaginas : dadosPaginados.numeroPagina,
            anterior: parseInt(dadosPaginados.numeroPagina) - 1 < 1 ? 1 : parseInt(dadosPaginados.numeroPagina) - 1,
            proxima: parseInt(dadosPaginados.numeroPagina) + 1 > parseInt(dadosPaginados.totalPaginas) ? parseInt(dadosPaginados.totalPaginas) : parseInt(dadosPaginados.numeroPagina) + 1,
            total: dadosPaginados.totalPaginas
        }

        res.render("usuarios", {
            title: TITLE,
            sessao: req.session,
            usuario: req.user,
            lista_usuarios: dadosPaginados.dadosTable,
            paginas: paginas,
        });

    } catch (erro) {
        console.log(erro);
    }
});

router.get('/usuarios/:id', async (req, res, next) => {
    const { id } = req.params;
    await database('usuarios')
        .where('id', id)
        .then((result) => {
            if (!result) {
                res.send(400);
                return;
            }

            res.json(result);
        }, next);
})

router.post('/usuarios', (req, res, next) => {
    res.redirect('/usuarios')
})

router.get('/user/add', (req, res, next) => {
    // console.log("Estou caindo aqui");
    res.render('add-user', { title: 'Criar novo Usuário', usuario: req.user });
});

router.post('/usuarios/add', async (req, res, next) => {
    const reqDados = {
        nome_completo: req.body.nome_completo,
        bi: req.body.bi,
        genero: req.body.genero,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        tipo_conta: req.body.tipo_conta
    }

    let schema = yup.object({
        nome_completo: yup.string().required("Preecha o campo nome"),
        bi: yup.string().max(14),
        genero: yup.string().required("Preecha o genero"),
        username: yup.string().required("preecha o username").lowercase("O username deve ser minusculos"),
        password: yup.string().required("Preecha a Palavra Passe").min(4)
    });

    if (!schema.isValid(req.body)) {

        res.status(400).render("add-user",
            {
                title: TITLE,
                message: {
                    erro: true,
                    texto: "erro",
                },
                sessao: req.session,
                usuario: req.user
            });
    }
    await database('usuarios').insert(reqDados)
        .then((ids) => {
            res.redirect('/usuarios');
        }, next)
});

router.get('/usuarios/edit-user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const [usuarioEditar] = await database('usuarios')
            .where('id', id);

        if (!usuarioEditar) {
            res.send(400);
            return;
        }

        res.render('edit-user', {
            title: 'Editar Usuário',
            usuario: req.user,
            usuarioEditar: usuarioEditar,
        });
    } catch (erro) {
        console.log(erro.message);
    }
});

function verificaAtributos(object) {

    if (!object.password) {
        return {
            nome_completo: object.nome_completo,
            bi: object.bi,
            genero: object.genero,
            username: object.username,
            tipo_conta: object.tipo_conta
        }
    } else {

        return {
            nome_completo: object.nome_completo,
            bi: object.bi,
            genero: object.genero,
            username: object.username,
            password: bcrypt.hashSync(object.password),
            tipo_conta: object.tipo_conta
        }
    }
}

router.put('/usuarios/edit-user/:id', async (req, res, next) => {
    // const reqDados = {
    //     nome_completo: req.body.nome_completo,
    //     bi: req.body.bi,
    //     genero: req.body.genero,
    //     username: req.body.username,
    //     password: bcrypt.hashSync(req.body.password),
    //     tipo_conta: req.body.tipo_conta
    // }

    let schema = yup.object({
        nome_completo: yup.string().required("Preecha o campo nome"),
        bi: yup.string().max(14),
        genero: yup.string().required("Preecha o genero"),
        username: yup.string().required("preecha o username").lowercase("O username deve ser minusculos"),
        password: yup.string().required("Preecha a Palavra Passe").min(4)
    });

    if (!schema.isValid(req.body)) {

        return res.status(400).render("edit-user",
            {
                title: "Editar Usuário",
                message: {
                    erro: true,
                    texto: "erro",
                },
                sessao: req.session,
                usuario: req.user
            });
    }

    //ToDo Melhorar o algoritmo de alterar a senha
    const { id } = req.params;
    const objectBody = req.body;

    await database('usuarios')
        .where('id', id)
        .update(verificaAtributos(objectBody))
        .then(result => {
            if (result == 0) {
                return res.send(400)
            }

            res.redirect('/usuarios');
        }, next);
});

router.delete('/usuarios/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await database('usuarios')
            .where('id', id)
            .delete();

        if (result === 0) {
            return res.send(400);
        }
        res.redirect('/usuarios');
    } catch (erro) {
        console.log(erro.message);
    }
});
module.exports = router;