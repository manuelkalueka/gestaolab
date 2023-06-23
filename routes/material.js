const express = require("express");
const router = express.Router();
const database = require('../database');
const yup = require('yup');
const moment = require('moment');

const TITLE = "Materiais do Laboratório";

router.get("/materiais", async (req, res, next) => {
    try {

        const dadosMesas = await database('mesas')
            .orderBy('nome', 'asc');
        const [user] = await database('usuarios')
            .where('username', req.user.username)
            .select('id');

        async function pagination(table) {
            const numeroPagina = (req.query.pagina) || 1; //pagina actual
            const registosPorPagina = 6;
            const deslocamento = registosPorPagina * (parseInt(numeroPagina) - 1);

            const dadosMateriais = await database(table)
                .limit(6)
                .offset(deslocamento)
                .orderBy('nome', 'asc');
            const [total] = await database(table)
                .count('*', { as: 'total' });

            const totalPaginas = Math.ceil(parseInt(total.total) / registosPorPagina);

            return {
                dadosMateriais,
                totalPaginas,
                numeroPagina,
                deslocamento,
            }
        }

        const dadosPaginados = await pagination('materiais');

        const paginas = {
            actual: dadosPaginados.numeroPagina,
            anterior: parseInt(dadosPaginados.numeroPagina) - 1,
            proxima: parseInt(dadosPaginados.numeroPagina) + 1 === dadosPaginados.totalPaginas ? dadosPaginados.totalPaginas : parseInt(dadosPaginados.numeroPagina) + 1,
            total: dadosPaginados.totalPaginas
        }
        res.render("material",
            {
                title: TITLE,
                materiais: dadosPaginados.dadosMateriais,
                paginas: paginas,
                mesas: dadosMesas,
                message: null,
                sessao: req.session,
                usuario: req.user,//objecto com os dados do usuario
                userId: user.id
            });
    } catch (erro) {
        console.log(erro);
        res.status(500).redirect('/');
    }
});

// router.get("/materiais/listar", async (req, res, next) => {
//     try {
//         const dados = await database('materiais')
//             .limit(6)
//             .orderBy('nome', 'asc');
//         res.json(dados);
//     } catch (erro) {
//         console.log(erro);
//         res.status(500).send("Erro ao listar os dados");
//     }
// });

router.post('/materiais/cadastrar', async (req, res, next) => {
    const reqDados = req.body;
    try {
        let dadosValidados = yup.object({
            nome: yup.string().required("Preencha o campo nome").strict(),
            marca: yup.string().default("Sem marca"),
            modelo: yup.string().default("Sem modelo"),
            tipo_material: yup.string(),
            data_compra: yup.date(),
            estado: yup.string(),
            capacidade: yup.string().required("Digite as capacidades do PC").max(45),
            tem_programas: yup.string().default("Sim"),
            mesa: yup.number().positive().required("Informe a mesa deste material").strict(),
            observacoes: yup.string()
        });

        const validacao = dadosValidados.isValid(reqDados);
        if (!validacao) {
            return res.status(400).json('rever os dados preechidos');
        }
    }
    catch (erro) {
        console.log(erro);
    }

    try {
        await database('materiais').insert(req.body);
        res.redirect('/materiais')
    } catch (erro) {
        console.log(erro);
        res.status(500).redirect('/materiais')
    }
});

router.get('/materiais/:id', async (req, res, next) => {
    const { id } = req.params;
    await database('materiais')
        .where('id', id)
        .then((result) => {
            if (!result) {
                res.send(400);
                return;
            }

            res.json(result);
        }, next);
});

router.put('/materiais/:id', async (req, res, next) => {
    const { id } = req.params;
    await database('materiais')
        .where('id', id)
        .update(req.body)
        .then(result => {
            if (result == 0) {
                return res.send(400)
            }

            res.redirect('/materiais');
        }, next);
});

//Apagar apenas um unico resgisto
router.delete('/materiais/:id', async (req, res, next) => {
    const { id } = req.params;
    // console.log("deletando" + id);
    await database('materiais')
        .where("id", id)
        .delete()
        .then((result) => {
            if (result === 0) {
                return res.send(400);
            }
            res.redirect('/materiais');
        }, next);
});

//apaga todos os registos da BD
router.delete('/materiais', async (req, res, next) => {
    await database('materiais')
        .truncate()
        .then(() => {
            res.redirect('/materiais');
        }, next);
});

module.exports = router;
