async function pagination(database, table, req, orderAtribute, laboratorio) {
    const numeroPagina = (req.query.pagina) || 1; //pagina actual
    const registosPorPagina = 6;
    const deslocamento = registosPorPagina * (parseInt(numeroPagina) - 1);
    let dadosTable;
    let total;

    if (table == 'materiais' || table == 'mesas') {
        dadosTable = await database(table)
            .where('laboratorio', laboratorio)
            .limit(6)
            .offset(deslocamento)
            .orderBy(orderAtribute, 'asc');
        [total] = await database(table)
            .count('*', { as: 'total' });
    }

    const resultado = Math.ceil(parseInt(total.total) / registosPorPagina);

    const totalPaginas = resultado == 0 ? 1 : resultado;
    return {
        dadosTable,
        totalPaginas,
        numeroPagina,
        deslocamento,
    }
}

module.exports = pagination;