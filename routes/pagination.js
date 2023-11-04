async function pagination(database, table, req, orderAtribute) {
    const numeroPagina = (req.query.pagina) || 1; //pagina actual
    const registosPorPagina = 6;
    const deslocamento = registosPorPagina * (parseInt(numeroPagina) - 1);

    const dadosTable = await database(table)
        .limit(6)
        .offset(deslocamento)
        .orderBy(orderAtribute, 'asc');
    const [total] = await database(table)
        .count('*', { as: 'total' });
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