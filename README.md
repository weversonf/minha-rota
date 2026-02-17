# Minha Rota v12 - GPS FZ25

Aplicação web para rastreamento GPS com análise de segurança de bairros em Fortaleza. Desenvolvida como Single Page Application (SPA) com HTML5, CSS3 e JavaScript puro.

## 🎯 Características Principais

- **Mapa Interativo:** Visualização em tempo real com Mapbox GL JS
- **Geolocalização:** Rastreamento contínuo da posição do usuário
- **Análise de Risco:** Identificação automática de bairros com alto índice de criminalidade
- **Cálculo de Rotas:** Estimativa de distância e custo de combustível
- **Alertas de Voz:** Notificações auditivas de zonas de risco
- **Botão SOS:** Compartilhamento rápido de localização via WhatsApp
- **Configurações Personalizáveis:** Ajuste de consumo e preço de combustível

## 📋 Pré-requisitos

- Navegador moderno com suporte a:
  - Geolocation API
  - LocalStorage
  - Web Speech API
  - Fetch API

- Conexão com a internet (para Mapbox e GeoJSON)

## 🚀 Como Usar

### 1. Instalação

Clone o repositório:

```bash
git clone https://github.com/weversonf/minha-rota.git
cd minha-rota
```

### 2. Configuração

Abra o arquivo `config.js` e configure:

```javascript
const CONFIG = {
    token: 'SEU_TOKEN_MAPBOX',
    chaveAcesso: 'SUA_CHAVE_DE_ACESSO',
    // ... outras configurações
};
```

**Para segurança em produção**, use variáveis de ambiente em vez de hardcoding.

### 3. Executar Localmente

Abra `index.html` em um navegador ou use um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx http-server
```

Acesse: `http://localhost:8000`

### 4. Autenticação

Na tela de login, insira a chave de acesso configurada (padrão: `FZ25-FOR`).

## 🗺️ Funcionalidades Detalhadas

### Mapa e Geolocalização

O mapa é centrado em Fortaleza e exibe bairros com codificação de cores:

- **Vermelho:** Risco Alto (CVP/Furto elevado)
- **Laranja:** Risco Médio
- **Transparente:** Risco Baixo

A localização do usuário é atualizada em tempo real quando o GPS está ativo.

### Cálculo de Rotas

1. Clique no mapa ou use o campo de busca para selecionar um destino
2. A rota é calculada automaticamente
3. Um card exibe:
   - Distância em quilômetros
   - Custo estimado de combustível
   - Botão para ativar GPS

**Fórmula de cálculo:**
```
Custo = (Distância ÷ Consumo) × Preço
```

### Configurações

No menu lateral, ajuste:

- **Consumo (km/L):** Eficiência do veículo
- **Preço Gasolina (R$/L):** Preço atual do combustível

As configurações são salvas automaticamente no localStorage.

### Botão SOS

Clique no botão 🆘 para compartilhar sua localização via WhatsApp com um link do Google Maps.

## 📁 Estrutura de Arquivos

```
minha-rota/
├── index.html          # Arquivo principal da aplicação
├── config.js           # Configurações centralizadas
├── utils.js            # Funções utilitárias
├── README.md           # Este arquivo
└── .gitignore          # Arquivos a ignorar no Git
```

## 🔐 Segurança

### ⚠️ Considerações Importantes

1. **Token Mapbox:** Nunca commit tokens em repositórios públicos. Use variáveis de ambiente.
2. **Chave de Acesso:** A chave atual é apenas para desenvolvimento. Implemente autenticação robusta em produção.
3. **Dados Sensíveis:** Não armazene informações sensíveis no localStorage.

### Recomendações para Produção

- Implemente um backend para autenticação
- Use HTTPS em produção
- Valide e sanitize todas as entradas do usuário
- Implemente rate limiting para APIs
- Use tokens JWT com expiração

## 🛠️ Desenvolvimento

### Adicionar Novas Funcionalidades

1. **Novo Módulo:** Crie um arquivo `novoModulo.js`
2. **Funções Utilitárias:** Adicione em `utils.js`
3. **Configurações:** Atualize `config.js`

### Exemplo: Adicionar Histórico de Rotas

```javascript
// Em utils.js
Utils.salvarRota = function(rota) {
    const historico = Utils.obterLocalStorage(CONFIG.storage.chaveHistorico, []);
    historico.push({
        ...rota,
        data: new Date().toISOString()
    });
    Utils.salvarLocalStorage(CONFIG.storage.chaveHistorico, historico);
};
```

## 🐛 Troubleshooting

### Mapa não carrega

- Verifique se o token Mapbox é válido
- Confirme a conexão com a internet
- Abra o console (F12) para ver mensagens de erro

### Geolocalização não funciona

- Permita acesso à localização no navegador
- Use HTTPS em produção (HTTP não funciona com Geolocation em alguns navegadores)
- Verifique se o GPS está ativado no dispositivo

### Rotas não calculam

- Confirme que o destino está dentro da área coberta pelo Mapbox
- Verifique o saldo de requisições da API Mapbox
- Tente um destino diferente

## 📊 Dados de Referência

Os dados de bairros de Fortaleza são carregados de:

```
https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/municipio/ce/fortaleza/bairros.geojson
```

A classificação de risco é baseada em índices de Crimes Violentos contra Pessoa (CVP) e Furto.

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Histórico de viagens
- [ ] Estatísticas de consumo
- [ ] Modo offline
- [ ] Integração com Firebase
- [ ] Aplicativo mobile (React Native)
- [ ] Dashboard de análise
- [ ] Compartilhamento de rotas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Weverson F.**

- GitHub: [@weversonf](https://github.com/weversonf)
- Email: [seu-email@exemplo.com]

## 🙏 Agradecimentos

- Mapbox pela excelente API de mapas
- Comunidade de dados abertos do Brasil
- Contribuidores e usuários do projeto

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma [issue](https://github.com/weversonf/minha-rota/issues) no repositório.

---

**Última atualização:** Fevereiro de 2026

**Versão:** 12.0.0
