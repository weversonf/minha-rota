/**
 * Configurações do Projeto Minha Rota v12
 * 
 * IMPORTANTE: Para produção, use variáveis de ambiente
 * Nunca commit tokens e chaves sensíveis no repositório
 */

const CONFIG = {
    // Token Mapbox - SUBSTITUIR COM VARIÁVEL DE AMBIENTE
    token: process.env.MAPBOX_TOKEN || 'pk.eyJ1Ijoid2V2ZXJzb25mIiwiYSI6ImNtbHF5bmh1YTA0djgzZHB4dTJpaG9rbHgifQ.jo3DG631F030AxG_nFKVEQ',
    
    // Chave de acesso ao aplicativo - SUBSTITUIR COM VARIÁVEL DE AMBIENTE
    chaveAcesso: process.env.APP_KEY || 'FZ25-FOR',
    
    // Coordenadas padrão (Fortaleza, CE)
    centro: [-38.5267, -3.7319],
    
    // URL do GeoJSON com dados de bairros
    urlBairros: 'https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/municipio/ce/fortaleza/bairros.geojson',
    
    // Configurações de mapa
    mapa: {
        zoom: 12,
        estilo: 'mapbox://styles/mapbox/dark-v11',
        zoomNavegacao: 17,
        pitch: 60
    },
    
    // Configurações padrão do veículo
    veiculo: {
        consumoPadrao: 29, // km/L
        precoPadrao: 6.15  // R$/L
    },
    
    // Bairros críticos com classificação de risco
    riscoBairros: {
        // Risco Alto (Vermelho)
        'CENTRO': '#ff0000',
        'MESSEJANA': '#ff0000',
        'JANGURUSSU': '#ff0000',
        'BARRA DO CEARÁ': '#ff0000',
        'BOM JARDIM': '#ff0000',
        'VILA VELHA': '#ff0000',
        
        // Risco Médio (Laranja)
        'PARANGABA': '#ffa500',
        'PASSARÉ': '#ffa500',
        'MONDUBIM': '#ffa500',
        'ALDEOTA': '#ffa500'
    },
    
    // Mensagens de alerta
    mensagens: {
        chaveInvalida: 'Chave de acesso inválida. Tente novamente.',
        erroMapa: 'Erro ao carregar o mapa. Verifique sua conexão.',
        erroRota: 'Não foi possível calcular a rota. Tente outro destino.',
        avisoRisco: 'Alerta: Bairro {bairro} é zona de risco.',
        modoGPS: 'Modo GPS ativo. Pilotagem monitorada.'
    },
    
    // Configurações de armazenamento local
    storage: {
        chaveAutenticacao: 'minha_rota_key',
        chaveConsumo: 'v_consumo',
        chavePreco: 'v_preco',
        chaveHistorico: 'minha_rota_historico'
    }
};

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
