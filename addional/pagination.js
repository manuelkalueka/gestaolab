async function pagination(
  database,
  table,
  req,
  orderAtribute,
  laboratorio,
  query
) {
  const numeroPagina = req.query.pagina || 1; //pagina actual
  const registosPorPagina = 6;
  const deslocamento = registosPorPagina * (parseInt(numeroPagina) - 1);

  if (table == "materiais" || table == "mesas") {
    if (!query) {
      const dadosTable = await database(table)
        .where("laboratorio", laboratorio)
        .limit(6)
        .offset(deslocamento)
        .orderBy(orderAtribute, "asc");

      const [totalDados] = await database(table).count("*", { as: "total" });
      const resultado = Math.ceil(
        parseInt(totalDados.total) / registosPorPagina
      );

      const totalPaginas = resultado == 0 ? 1 : resultado;
      return {
        dadosTable,
        totalPaginas,
        numeroPagina,
        deslocamento,
      };
    } else {
      const dadosTable = await database(table)
        .where("laboratorio", laboratorio)
        .andWhereILike("nome", `%${query}%`)
        .limit(6)
        .offset(deslocamento)
        .orderBy(orderAtribute, "asc");
      const [totalDados] = await database(table).count("*", { as: "total" });
      const resultado = Math.ceil(
        parseInt(totalDados.total) / registosPorPagina
      );

      const totalPaginas = resultado == 0 ? 1 : resultado;
      return {
        dadosTable,
        totalPaginas,
        numeroPagina,
        deslocamento,
      };
    }
  } else {

    const dadosTable = await database(table)
      .limit(6)
      .offset(deslocamento)
      .orderBy(orderAtribute, "asc");
    const [totalDados] = await database(table).count("*", { as: "total" });
    const resultado = Math.ceil(parseInt(totalDados.total) / registosPorPagina);

    const totalPaginas = resultado == 0 ? 1 : resultado;
    return {
      dadosTable,
      totalPaginas,
      numeroPagina,
      deslocamento,
    };
  }
}

module.exports = pagination;
