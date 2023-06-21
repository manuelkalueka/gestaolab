const express = require('express');
const router = express.Router();
const TITULO_PAGE = 'Dashboard';
const database = require('../database');

router.get('/dashboard', async (req, res, next) => {
    try {
        const [mesas] = await database('mesas').count('*', { as: 'total_mesas' });
        const [PC] = await database('materiais')
            .where('tipo_material', 'pc')
            .count('*', { as: 'total_pc' });

        const [PC_avariados] = await database('materiais')
            .where({ tipo_material: 'pc', estado: 'Danificado' })
            .count('*', { as: 'total_pc_avariados' });

        const [Pc_incompleto] = await database('materiais')
            .where({ tipo_material: 'pc', estado: 'Rasoável' })
            .count('*', { as: 'total_pc_incompleto' });
        const [total_materiais] = await database('materiais')
            .count('*', { as: 'total_materiais' });
        const [pc_bons] = await database('materiais')
            .where({ tipo_material: 'pc', estado: 'Bom' })
            .count('*', { as: 'total_pc_bons' });

        res.render('dashboard', {
            title: TITULO_PAGE,
            total_mesas: mesas.total_mesas,
            total_pc: PC.total_pc,
            total_pc_avaria: PC_avariados.total_pc_avariados,
            total_pc_incompleto: Pc_incompleto.total_pc_incompleto,
            total_materiais: total_materiais.total_materiais,
            total_pc_bons: pc_bons.total_pc_bons,
            sessao: req.session,
            usuario: req.user
        });
    }
    catch (erro) {
        console.log(erro.message);
    }
});

router.post('/dashboard', (req, res, next) => {
    res.redirect('dashboard');
});

module.exports = router;