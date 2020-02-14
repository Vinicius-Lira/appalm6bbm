export default [
    {
        path: '',
        // Relative to /src/views
        name: 'dashboard',
        view: 'Dashboard'
    },
    {
        path: '/contratos',
        name: 'Contratos',
        view: 'almoxarifado/Contratos'
    },
    {
        path: '/lotes',
        name: 'Lotes',
        view: 'almoxarifado/Lote'
    },
    {
        path: '/fornecedor',
        name: 'Fornecedor',
        view: 'almoxarifado/Fornecedor'
    },
    {
        path: '/categoriaProdutos',
        name: 'Categoria Produtos',
        view: 'cadastros/CategoriaProduto'
    },
    {
        path: '/produtos',
        name: 'Produtos',
        view: 'almoxarifado/Produtos'
    },
    {
        path: '/propriedadesProduto',
        name: 'Propriedades Produtos',
        view: 'almoxarifado/PropriedadesProduto'
    },
    {
        path: '/entradas',
        name: 'Entradas',
        view: 'almoxarifado/Entradas'
    },
    {
        path: '/saidas',
        name: 'Saídas',
        view: 'almoxarifado/Saidas'
    },
    {
        path: '/grupoPatrimonio',
        name: 'Grupos Patrimônio',
        view: 'cadastros/GrupoPatrimonio'
    },
    {
        path: '/hierarquia',
        name: 'Hierarquias',
        view: 'cadastros/Hierarquia'
    },
    {
        path: '/obms',
        name: 'OBM',
        view: 'cadastros/Obms'
    },
    {
        path: '/pessoas',
        name: 'Pessoas',
        view: 'cadastros/Pessoas'
    },
    {
        path: '/setores',
        name: 'Setores',
        view: 'cadastros/Setores'
    },
    {
        path: '/situacaoPatrimonio',
        name: 'Situações Patrimônio',
        view: 'cadastros/SituacaoPatrimonio'
    },
    {
        path: '/patrimonio',
        name: 'Patrimônio',
        view: 'patrimonio/Patrimonio'
    },
    {
        path: '/patrimonioMovimentacoes',
        name: 'Movimentação Patrimônio',
        view: 'patrimonio/MovimentacoesPatrimonio'
    },
    {
        path: '/patrimonioBaixas',
        name: 'Baixa Patrimônio',
        view: 'patrimonio/BaixaPatrimonio'
    },
    {
        path: '/login',
        name: 'Login',
        view: 'login/Login',
        meta: {
            requiresAuth: true
        }
    }
]
