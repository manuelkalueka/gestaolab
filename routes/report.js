var express = require("express");
var router = express.Router();
const database = require("../database");
const PDFPrinter = require("pdfmake");
const fs = require("fs");
const { getSelectedLab } = require("../middlewares/laboratorio");

router.get("/report/materiais", async (req, res) => {
  //relatorio de materiais
  try {
    const [nomeLaboratorioSelecionado] = await database("laboratorios")
      .where("id", getSelectedLab())
      .select("nome");
    console.log("object :>> ", nomeLaboratorioSelecionado);
    const materiais = await database("materiais").where(
      "laboratorio",
      getSelectedLab()
    );
    const user = req.user.nome_completo;

    const body = [];
    const imagePath = "public/images/logo.png";
    // console.log(imagePath)
    const myLogo = fs.readFileSync(imagePath, "base64");

    for await (let material of materiais) {
      const rows = [];
      rows.push(material.nome);
      rows.push(material.marca);
      rows.push(material.estado);

      body.push(rows);
    }

    const fonts = {
      Times: {
        normal: "Times-Roman",
        bold: "Times-Bold",
        italics: "Times-Italic",
        bolditalics: "Times-BoldItalic",
      },
    };

    const printer = new PDFPrinter(fonts); // configurar o pdf -- espera receber fonts

    const docDefinition = {
      defaultStyle: { font: "Times", alignment: "center" },
      info: {
        title: "Relatório de Computadores no GestaoLab",
        author: "GestaoLab",
        subject: "Plano de Necessidades",
      },
      content: [
        {
          image: `data:image/png;base64,${myLogo}`,
          width: 75,
        },
        {
          text: "Centro de Formação Tecnológico do Uíge\n\n\n".toUpperCase(),
          style: "header",
        },

        {
          text:
            "Plano de Necessidades para o " +
            nomeLaboratorioSelecionado.nome +
            "\n\n",
          style: "header",
        },

        {
          table: {
            widths: ["40%", "30%", "30%"],
            heights: 10,
            body: [
              [
                { text: "Designação", style: "columnTitle" },
                { text: "Marca", style: "columnTitle" },
                { text: "Estado", style: "columnTitle" },
              ],
              ...body,
            ],
          },
          style: "text",
        },
        {
          text: `\n\nUíge, aos ${new Date().toLocaleDateString()}\n\n\n\n`,
          style: "text",
        },
        {
          text: "O Responsável\n\n",
          style: "text",
        },
        {
          text: `${user}`,
          style: "textUSer",
        },
      ],
      footer: [
        {
          text: `Relatório Gerado pelo GestaoLab - Em: ${new Date().toLocaleString()}`,
          style: "footer",
        },
      ],

      styles: {
        content: {
          alignment: "left",
        },
        header: {
          fontSize: 14,
          bold: true,
        },
        text: {
          fontSize: 12,
          alignment: "center",
        },
        Number: { fontSize: 12, alignment: "right" },
        textUSer: {
          fontSize: 12,
          italics: true,
        },
        columnTitle: {
          bold: true,
          alignment: "center",
        },

        footer: {
          fontSize: 10,
          italics: true,
          alignment: "center",
        },
        imageStyle: {},
        // margin: {
        //   margin: [2.5, 2, 2.5, 3]
        // }
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition); // criar a definição do relatório
    // pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf")) Gravar o PDF

    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      // usar o chunk para iterar dentro do nosso relatorio
      chunks.push(chunk);
    }); //pega o conteudo e trata ele

    pdfDoc.end(); // termina a criação do relatório

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      res.end(result);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/report/mesas", async (req, res) => {
  //relatorio de mesas
  try {
    const [nomeLaboratorioSelecionado] = await database("laboratorios")
      .where("id", getSelectedLab())
      .select("nome");

    const mesas = await database("mesas").where(
      "laboratorio",
      getSelectedLab()
    );
    const user = req.user.nome_completo;

    const body = [];
    const imagePath = "public/images/logo.png";
    // console.log(imagePath)
    const myLogo = fs.readFileSync(imagePath, "base64");

    for await (let mesa of mesas) {
      const rows = [];
      rows.push(mesa.nome);
      rows.push(mesa.num_maximo_pc);
      rows.push(mesa.estado);

      body.push(rows);
    }

    const fonts = {
      Times: {
        normal: "Times-Roman",
        bold: "Times-Bold",
        italics: "Times-Italic",
        bolditalics: "Times-BoldItalic",
      },
    };

    const printer = new PDFPrinter(fonts); // configurar o pdf -- espera receber fonts

    const docDefinition = {
      defaultStyle: { font: "Times", alignment: "center" },
      info: {
        title: "Relatório de Computadores no GestaoLab",
        author: "GestaoLab",
        subject: "Plano de Necessidades",
      },
      content: [
        {
          image: `data:image/png;base64,${myLogo}`,
          width: 75,
        },
        {
          text: "Centro de Formação Tecnológico do Uíge\n\n\n".toUpperCase(),
          style: "header",
        },

        {
          text:
            "Plano de Necessidades para o " +
            nomeLaboratorioSelecionado.nome +
            "\n\n",
          style: "header",
        },

        {
          table: {
            widths: ["40%", "auto", "20%"],
            heights: 10,
            body: [
              [
                { text: "Designação", style: "columnTitle" },
                {
                  text: "Nº Máximo de Computador na Mesa",
                  style: "columnTitle",
                },
                { text: "Estado", style: "columnTitle" },
              ],
              ...body,
            ],
          },
          style: "text",
        },
        {
          text: `\n\nUíge, aos ${new Date().toLocaleDateString()}\n\n\n\n`,
          style: "text",
        },
        {
          text: "O Responsável\n\n",
          style: "text",
        },
        {
          text: `${user}`,
          style: "textUSer",
        },
      ],
      footer: [
        {
          text: `Relatório Gerado pelo GestaoLab - Em: ${new Date().toLocaleString()}`,
          style: "footer",
        },
      ],

      styles: {
        content: {
          alignment: "left",
        },
        header: {
          fontSize: 14,
          bold: true,
        },
        text: {
          fontSize: 12,
          alignment: "center",
        },
        Number: { fontSize: 12, alignment: "right" },
        textUSer: {
          fontSize: 12,
          italics: true,
        },
        columnTitle: {
          bold: true,
          alignment: "center",
        },

        footer: {
          fontSize: 10,
          italics: true,
          alignment: "center",
        },
        imageStyle: {},
        // margin: {
        //   margin: [2.5, 2, 2.5, 3]
        // }
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition); // criar a definição do relatório
    // pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf")) Gravar o PDF

    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      // usar o chunk para iterar dentro do nosso relatorio
      chunks.push(chunk);
    }); //pega o conteudo e trata ele

    pdfDoc.end(); // termina a criação do relatório

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      res.end(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
