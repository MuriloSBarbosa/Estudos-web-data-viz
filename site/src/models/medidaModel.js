var database = require("../database/config");

function buscarUltimasMedidas(idOrquestra) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select count(m.fkInstrumento) as qtdInstrumento,
		ins.naipe as nome
        from musico m
            join integrante i
                on i.idIntegrante = m.fkMusico
            join instrumento ins
                on ins.idInstrumento = m.fkInstrumento
			join orquestra o
				on o.idOrquestra = m.fkOrquestra
                where o.idOrquestra = ${idOrquestra}
                group by ins.naipe;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `       select count(m.fkInstrumento) as qtdInstrumento,
		ins.naipe as nome
        from musico m
            join integrante i
                on i.idIntegrante = m.fkMusico
            join instrumento ins
                on ins.idInstrumento = m.fkInstrumento
			join orquestra o
				on o.idOrquestra = m.fkOrquestra
                where o.idOrquestra = ${idOrquestra}
                group by ins.naipe;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
/*
function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


*/
module.exports = {
    buscarUltimasMedidas,
    // buscarMedidasEmTempoReal
}