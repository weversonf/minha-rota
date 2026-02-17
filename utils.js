/**
 * Utilitários do Projeto Minha Rota v12
 * Funções auxiliares para operações comuns
 */

const Utils = {
    /**
     * Valida se um valor é um número válido e positivo
     * @param {number} valor - Valor a validar
     * @param {number} minimo - Valor mínimo permitido (padrão: 0)
     * @returns {boolean}
     */
    validarNumeroPositivo(valor, minimo = 0) {
        const num = parseFloat(valor);
        return !isNaN(num) && num > minimo;
    },

    /**
     * Formata um valor monetário em Real
     * @param {number} valor - Valor a formatar
     * @returns {string} Valor formatado (ex: "R$ 10,50")
     */
    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    },

    /**
     * Formata distância em quilômetros
     * @param {number} distancia - Distância em metros
     * @returns {string} Distância formatada (ex: "15,5 km")
     */
    formatarDistancia(distancia) {
        const km = (distancia / 1000).toFixed(1);
        return `${km} km`;
    },

    /**
     * Calcula o custo de combustível
     * @param {number} distancia - Distância em km
     * @param {number} consumo - Consumo em km/L
     * @param {number} preco - Preço em R$/L
     * @returns {number} Custo calculado
     */
    calcularCusto(distancia, consumo, preco) {
        if (!this.validarNumeroPositivo(consumo) || !this.validarNumeroPositivo(preco)) {
            console.error('Valores de consumo ou preço inválidos');
            return 0;
        }
        return (distancia / consumo) * preco;
    },

    /**
     * Reproduz uma mensagem de áudio usando Speech Synthesis
     * @param {string} mensagem - Texto a reproduzir
     * @param {string} idioma - Código do idioma (padrão: pt-BR)
     */
    falarMensagem(mensagem, idioma = 'pt-BR') {
        try {
            const utterance = new SpeechSynthesisUtterance(mensagem);
            utterance.lang = idioma;
            window.speechSynthesis.speak(utterance);
        } catch (erro) {
            console.error('Erro ao reproduzir áudio:', erro);
        }
    },

    /**
     * Abre WhatsApp com mensagem pré-formatada
     * @param {number} latitude - Latitude da localização
     * @param {number} longitude - Longitude da localização
     * @param {string} mensagem - Mensagem adicional (opcional)
     */
    abrirWhatsApp(latitude, longitude, mensagem = '') {
        const localizacao = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const textoCompleto = `🚨 EMERGÊNCIA FZ25! Localização atual: ${localizacao}${mensagem ? '\n' + mensagem : ''}`;
        const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(textoCompleto)}`;
        window.open(urlWhatsApp);
    },

    /**
     * Salva dados no localStorage com tratamento de erro
     * @param {string} chave - Chave de armazenamento
     * @param {*} valor - Valor a armazenar
     * @returns {boolean} Sucesso da operação
     */
    salvarLocalStorage(chave, valor) {
        try {
            localStorage.setItem(chave, JSON.stringify(valor));
            return true;
        } catch (erro) {
            console.error(`Erro ao salvar ${chave}:`, erro);
            return false;
        }
    },

    /**
     * Recupera dados do localStorage com tratamento de erro
     * @param {string} chave - Chave de armazenamento
     * @param {*} padrao - Valor padrão se não encontrado
     * @returns {*} Valor armazenado ou padrão
     */
    obterLocalStorage(chave, padrao = null) {
        try {
            const valor = localStorage.getItem(chave);
            return valor ? JSON.parse(valor) : padrao;
        } catch (erro) {
            console.error(`Erro ao obter ${chave}:`, erro);
            return padrao;
        }
    },

    /**
     * Limpa dados do localStorage com confirmação
     * @param {boolean} confirmar - Se deve pedir confirmação
     * @returns {boolean} Sucesso da operação
     */
    limparLocalStorage(confirmar = true) {
        if (confirmar && !window.confirm('Deseja realmente limpar todos os dados?')) {
            return false;
        }
        try {
            localStorage.clear();
            return true;
        } catch (erro) {
            console.error('Erro ao limpar localStorage:', erro);
            return false;
        }
    },

    /**
     * Mostra uma notificação temporária ao usuário
     * @param {string} mensagem - Mensagem a exibir
     * @param {string} tipo - Tipo de notificação (sucesso, erro, aviso)
     * @param {number} duracao - Duração em ms (padrão: 3000)
     */
    mostrarNotificacao(mensagem, tipo = 'info', duracao = 3000) {
        const cores = {
            sucesso: '#27ae60',
            erro: '#e74c3c',
            aviso: '#f39c12',
            info: '#3498db'
        };

        const notificacao = document.createElement('div');
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${cores[tipo] || cores.info};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;
        notificacao.textContent = mensagem;
        document.body.appendChild(notificacao);

        setTimeout(() => {
            notificacao.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notificacao.remove(), 300);
        }, duracao);
    },

    /**
     * Debounce para limitar chamadas frequentes de funções
     * @param {Function} funcao - Função a executar
     * @param {number} espera - Tempo de espera em ms
     * @returns {Function} Função com debounce aplicado
     */
    debounce(funcao, espera = 300) {
        let timeout;
        return function executada(...args) {
            const depois = () => {
                clearTimeout(timeout);
                funcao(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(depois, espera);
        };
    },

    /**
     * Throttle para limitar execução de funções
     * @param {Function} funcao - Função a executar
     * @param {number} limite - Tempo mínimo entre execuções em ms
     * @returns {Function} Função com throttle aplicado
     */
    throttle(funcao, limite = 300) {
        let emExecucao = false;
        return function executada(...args) {
            if (!emExecucao) {
                funcao(...args);
                emExecucao = true;
                setTimeout(() => {
                    emExecucao = false;
                }, limite);
            }
        };
    }
};

// Adicionar animações CSS necessárias
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
