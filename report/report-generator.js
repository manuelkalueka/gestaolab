async function gerarRelatorio() {
    try {
        const PDFDocument = require('pdfkit');
        const fs = require('fs');
        const database = require('../database');

        const query = await database('materiais');

        const pdfName = 'relatorio.pdf';
        const Document = new PDFDocument();

        const stylesheet = `* {
            margin: 0;
            padding: 0;
          }
          
          body {
            font-size: 14px;
            background-color: #ccc;
          }
          
          main {
            width: 793.7008px;
            height: 1122.5197px;
            margin: 0 auto;
          
            background-color: #fff;
            color: #000;
          
            padding-left: 9.448816666666667em; /* 3 centrimentos */
            padding-top: 7.874016666666667em; /* 2,5 centrimentos */
            padding-right: 6.299216666666667em; /* 2centrimentos */
            padding-bottom: 7.874016666666667em; /* 2,5 centrimentos */
          
            line-height: 1.5;
          }
          
          img {
            display: block;
            margin: 0 auto 12pt;
            max-width: 9.4em;
          }
          
          h1,
          h2 {
              font-size: 1.2em;
            text-transform: uppercase;
          }
          
          h1,
          h2,
          p,
          span {
            text-align: center;
            margin-bottom: 12pt;
          }
          
          table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #000;
              padding: 5px;
            }
          
          h2 {
            margin-top: 80px;
          }
          
          span {
            display: block;
          }
          `

        const bodyHTML = `
          <main>
          <div><img src="report-images/logo-cftu.jpg" alt="" /></div>
          <h1>Centro de formação tecnológico do uíge</h1>
          <h2>Plano de necessidade</h2>
          <table>
            <tr>
              <thead>
                <th>Nº</th>
                <th>Designação</th>
                <th>Quantidade</th>
                <th>Estado</th>
              </thead>
              <tbody>
              ${query.map((row) => `<tr><td>${row.nome}</td><td>${query.length}</td><td>${row.estado}</td></tr>`).join('')}
              </tbody>
            </tr>
          </table>
          <p>Uíge, aos 01 de Novembro de 2023</p>
          <p>
            <span>O Responsável</span>
            <span>Utilizador</span>
          </p>
        </main>
          `
        Document.pipe(fs.createWriteStream(pdfName));//criação do pdf
        // Adicionar estilos CSS
        // doc.registerFont('CustomFont', 'caminho_da_fonte.ttf');
        // doc.font('CustomFont').fontSize(14);
        Document.image('./report-images/logo-cftu.jpg');
        Document.text(bodyHTML);
        console.log('escvreu')
        Document.end()
    } catch (error) {
        console.log(error)
    }

}

gerarRelatorio()