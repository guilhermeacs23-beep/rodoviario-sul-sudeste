# Rodoviário Sul Sudeste — como publicar na Vercel

## 1. Publicar (leva ~2 minutos, sem instalar nada)

1. Acesse **vercel.com** e crie uma conta (pode entrar com Google ou GitHub — plano gratuito basta).
2. No painel, clique em **Add New… → Project**.
3. Escolha a opção de **enviar arquivos** (drag & drop): arraste a pasta `site-rodosulsudeste` inteira para a área indicada.
   - Alternativa (recomendada se for atualizar com frequência): suba a pasta para um repositório no GitHub e conecte o repositório na Vercel. Aí cada alteração enviada ao GitHub publica sozinha.
4. Em *Framework Preset*, deixe **Other** (é um site estático puro — não precisa de build).
5. Clique em **Deploy**.

Pronto: a Vercel devolve um endereço como `rodosulsudeste.vercel.app`, já com HTTPS.

## 2. Colocar o domínio próprio

1. Registre o domínio no **registro.br** (para `.com.br`) — custa cerca de R$ 40/ano.
2. Na Vercel, abra o projeto → **Settings → Domains** → digite o domínio e clique em **Add**.
3. A Vercel mostra os registros de DNS a configurar. No registro.br, escolha "alterar servidores DNS" ou cadastre os registros indicados:
   - Domínio raiz (`seudominio.com.br`) → registro **A** apontando para o IP informado pela Vercel
   - `www` → registro **CNAME** apontando para `cname.vercel-dns.com`
4. Aguarde a propagação (de minutos a algumas horas). O certificado SSL é emitido automaticamente.

### Sugestões de domínio
- `rodosulsudeste.com.br` (curto, fácil de falar ao telefone)
- `rodoviariosulsudeste.com.br` (nome completo, mais formal)
- `rss-transportes.com.br` (alternativa se os anteriores estiverem ocupados)

Verifique a disponibilidade em registro.br antes de decidir.

## 3. Atualizar o site depois

- **Se publicou por drag & drop:** repita o envio da pasta (Add New → Project ou, no projeto existente, um novo deploy).
- **Se conectou ao GitHub:** basta enviar os arquivos alterados ao repositório; a Vercel publica sozinha.

## 4. O que ainda precisa ser definido

| Item | Situação | O que fazer |
|---|---|---|
| E-mail institucional | Está como `sac@rodosulsudeste.com.br` | Confirmar o endereço real e me avisar para ajustar |
| Redes sociais | Ícones no topo apontam para `#` | Enviar os links de Instagram, Facebook e LinkedIn |
| Sistema de rastreamento | Formulário envia a consulta pelo WhatsApp | Se houver sistema online, me passe o link para eu ligar o botão |
| Fotos | Imagens abstratas geradas (fundo azul com rotas) | Enviar fotos reais de frota, armazém e equipe |
| Endereço e telefones | Iguais aos da empresa irmã | Confirmar se mudam para o novo CNPJ |

## Estrutura de arquivos

```
site-rodosulsudeste/
├── index.html              Home
├── sobre-nos.html          Sobre Nós
├── servicos.html           Serviços (8 serviços)
├── beneficios.html         Benefícios
├── area-de-atuacao.html    Área de Atuação
├── cotacao.html            Formulário de cotação → WhatsApp
├── contato.html            Canais + formulário → WhatsApp
├── trabalhe-conosco.html   Cadastro de motoristas → WhatsApp
├── rastreamento.html       Consulta de carga → WhatsApp
├── css/style.css           Estilos
├── js/main.js              Interações
├── img/                    Logo, favicon, mapa e imagens
├── vercel.json             URLs limpas (sem .html)
└── robots.txt
```

Todos os formulários abrem o WhatsApp com a mensagem já montada — não há envio de e-mail pelo site, e os endereços de e-mail aparecem apenas como texto.
