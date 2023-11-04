const express = require("express");
const router = express.Router();
const database = require('../database');
const yup = require('yup');
const pagination = require('./pagination');
const TITLE = "Materiais do Laboratório";

const PDFPrinter = require('pdfmake');
const fs = require('fs');

router.get("/materiais", async (req, res, next) => {
    try {

        const dadosMesas = await database('mesas')
            .orderBy('nome', 'asc');

        const [user] = await database('usuarios')
            .where('username', req.user.username)
            .select('id');

        const dadosPaginados = await pagination(database, 'materiais', req, 'nome');

        const paginas = {
            actual: parseInt(dadosPaginados.numeroPagina) > dadosPaginados.totalPaginas ? dadosPaginados.totalPaginas : dadosPaginados.numeroPagina,
            anterior: parseInt(dadosPaginados.numeroPagina) - 1 < 1 ? 1 : parseInt(dadosPaginados.numeroPagina) - 1,
            proxima: parseInt(dadosPaginados.numeroPagina) + 1 > parseInt(dadosPaginados.totalPaginas) ? parseInt(dadosPaginados.totalPaginas) : parseInt(dadosPaginados.numeroPagina) + 1,
            total: dadosPaginados.totalPaginas
        }

        res.render("material",
            {
                title: TITLE,
                materiais: dadosPaginados.dadosTable,
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

router.get('/materiais/report', async (request, response) => {
    response.end('Olá Kalueka')
    // try {
    //     const materiais = await database('materiais');
    //     const user = request.user.nome_completo;

    //     const body = [];
    //     const imagePath = 'public/images/logo.png';
    //     // console.log(imagePath)
    //     const myLogo = fs.readFileSync(imagePath, 'base64');

    //     for await (let material of materiais) {
    //         const rows = [];
    //         rows.push(material.nome)
    //         rows.push(material.marca)
    //         rows.push(material.estado)

    //         body.push(rows);
    //     }

    //     const fonts = {
    //         Times: {
    //             normal: 'Times-Roman',
    //             bold: 'Times-Bold',
    //             italics: 'Times-Italic',
    //             bolditalics: 'Times-BoldItalic'
    //         }
    //     };

    //     const printer = new PDFPrinter(fonts) // configurar o pdf -- espera receber fonts

    //     const docDefinition = {
    //         defaultStyle: { font: 'Times', alignment: 'center' },
    //         info: {
    //             title: 'Relatório de Computadores no GestaoLab',
    //             author: 'GestaoLab',
    //             subject: 'Plano de Necessidades',
    //         },
    //         content: [
    //             {
    //                 image: `data:image/png;base64,${myLogo}`,
    //                 width: 75,
    //             },
    //             {
    //                 text: "Centro de Formação Tecnológico do Uíge\n\n\n".toUpperCase(),
    //                 style: 'header'
    //             },

    //             {
    //                 text: "Plano de Necessidades\n\n",
    //                 style: 'header'
    //             },

    //             {
    //                 table: {
    //                     widths: ['40%', '30%', '30%'],
    //                     heights: 10,
    //                     body: [
    //                         [{ text: "Designação", style: 'columnTitle' }, { text: "Marca", style: 'columnTitle' }, { text: "Estado", style: 'columnTitle' }], ...body]
    //                 },
    //                 style: 'text'
    //             },
    //             {
    //                 text: `\n\nUíge, aos ${new Date().toLocaleDateString()}\n\n\n\n`,
    //                 style: 'text'
    //             },
    //             {
    //                 text: "O Responsável\n\n",
    //                 style: 'text'
    //             },
    //             {
    //                 text: `${user}`,
    //                 style: 'textUSer'
    //             },
    //         ],
    //         footer: [
    //             {
    //                 text: `Relatório Gerado pelo GestaoLab - Em: ${new Date().toLocaleString()}`, style: 'footer'
    //             }
    //         ],

    //         styles: {
    //             content: {
    //                 alignment: "left"
    //             },
    //             header: {
    //                 fontSize: 14,
    //                 bold: true,
    //             },
    //             text: {
    //                 fontSize: 12
    //             },
    //             textUSer: {
    //                 fontSize: 12,
    //                 italics: true
    //             },
    //             columnTitle: {
    //                 bold: true,
    //                 alignment: 'center'
    //             },

    //             footer: {
    //                 fontSize: 10,
    //                 italics: true,
    //                 alignment: 'center'
    //             },
    //             imageStyle: {
    //             }
    //             // margin: {
    //             //   margin: [2.5, 2, 2.5, 3]
    //             // }
    //         }
    //     }

    //     const pdfDoc = printer.createPdfKitDocument(docDefinition)// criar a definição do relatório
    //     // pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf")) Gravar o PDF

    //     const chunks = []

    //     pdfDoc.on('data', (chunk) => {// usar o chunk para iterar dentro do nosso relatorio
    //         chunks.push(chunk)
    //     })//pega o conteudo e trata ele

    //     pdfDoc.end(); // termina a criação do relatório

    //     pdfDoc.on('end', () => {
    //         const result = Buffer.concat(chunks)
    //         // response.end(result);
    //     })

    // } catch (error) {
    //     console.log(error)
    // }
})


module.exports = router;
