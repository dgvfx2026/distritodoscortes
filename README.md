# Distrito dos Cortes

Landing page estática em português para o pack de cortes de lives. O arquivo principal é `index.html`. A página funciona localmente e usa fontes, imagens e prévias armazenadas em `assets/`.

## Configurar a venda

1. Quando as vendas forem abertas, preencha o atributo `content` da meta tag `checkout-url`, no início de `index.html`, com a URL HTTPS oficial do produto. O botão **Comprar o pack** aparece automaticamente. Enquanto o campo estiver vazio, a oferta exibe **Vendas em breve**.
2. Para mudar o preço, atualize o valor numérico e o texto do elemento `<data id="pack-price">` no HTML. Mantenha o valor do checkout de acordo com o que estiver na página.
3. Configure no serviço de venda a entrega do link do Google Drive aos compradores. Mantenha no Drive as pastas de cada criador e live e adicione os cortes novos ao acervo.

## Publicar via GitHub e Vercel

1. Suba o conteúdo da pasta para um repositório do GitHub, com `index.html` na raiz.
2. Importe o repositório na Vercel. O preset é **Other** e o comando de build fica vazio. O `vercel.json` já define essas opções.
3. Quando souber a URL pública, adicione `<link rel="canonical" href="…">` e `<meta property="og:url" content="…">` no `head`. Troque `assets/compartilhar.jpg` pela URL HTTPS absoluta da imagem no Open Graph e no JSON-LD. Isso completa os dados de compartilhamento para o domínio publicado.

[Configuração oficial de build da Vercel](https://vercel.com/docs/builds#skipping-the-build-step)

## Prévias e identidade

- Nove prévias de 12 segundos derivadas do acervo informado, com capas WebP e reprodução por clique. O conteúdo integral do pack não faz parte dos arquivos do site.
- Tipografia Barlow e Barlow Condensed sob a SIL Open Font License. Veja `assets/fonts/OFL.txt`.
- Cenário de fundo criado com ImageGen a partir da descrição de uma cidade tropical à beira da baía, com palmeiras, em luz violeta e coral de fim de tarde.
- Confirme as permissões de distribuição comercial dos cortes e das prévias antes de publicar.
