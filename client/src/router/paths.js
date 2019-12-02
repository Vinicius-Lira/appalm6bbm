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
        view: 'Contratos'
    },
    {
        path: '/lotes',
        name: 'Lotes',
        view: 'Lote'
    },
    {
        path: '/fornecedor',
        name: 'Fornecedor',
        view: 'Fornecedor'
    },
    {
        path: '/categoriaProdutos',
        name: 'Categoria Produtos',
        view: 'CategoriaProduto'
    },
    {
        path: '/produtos',
        name: 'Produtos',
        view: 'Produtos'
    },
    {
        path: '/propriedadesProduto',
        name: 'Propriedades Produtos',
        view: 'PropriedadesProduto'
    },
    {
        path: '/entradas',
        name: 'Entradas',
        view: 'Entradas'
    },
    {
        path: '/saidas',
        name: 'Saídas',
        view: 'Saidas'
    },
    {
        path: '/grupoPatrimonio',
        name: 'Grupos Patrimônio',
        view: 'GrupoPatrimonio'
    },
    {
        path: '/hierarquia',
        name: 'Hierarquias',
        view: 'Hierarquia'
    },
    {
        path: '/obms',
        name: 'OBM',
        view: 'Obms'
    },
    {
        path: '/pessoas',
        name: 'Pessoas',
        view: 'Pessoas'
    },
    {
        path: '/setores',
        name: 'Setores',
        view: 'Setores'
    },
    {
        path: '/situacaoPatrimonio',
        name: 'Situações Patrimônio',
        view: 'SituacaoPatrimonio'
    },
    {
        path: '/patrimonio',
        name: 'Patrimônio',
        view: 'Patrimonio'
    },
    {
        path: '/patrimonioMovimentacoes',
        name: 'Movimentação Patrimônio',
        view: 'MovimentacoesPatrimonio'
    },
    {
        path: '/patrimonioBaixas',
        name: 'Baixa Patrimônio',
        view: 'BaixaPatrimonio'
    },
    {
        path: '/login',
        name: 'Login',
        view: 'Login',
        meta: {
            requiresAuth: true
        }
    }
]
