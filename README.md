# Distrito dos Cortes

Landing page estática em português para o pack de cortes de lives. O arquivo principal é `index.html`. A página funciona localmente e usa fontes, imagens e prévias armazenadas em `assets/`.

## Configurar a venda

1. Os botões **Assinar mensal** e **Assinar anual** apontam para seus respectivos checkouts da Kiwify. Para trocar um link, edite o atributo `href` do botão correspondente na seção `#oferta` de `index.html`.
2. Ao mudar um preço na Kiwify, atualize o texto e o atributo `value` do respectivo `<data>` no HTML. Confira separadamente o preço mensal, o valor anual à vista e o número e valor das parcelas do anual. Recalcule a economia subtraindo o valor anual à vista de 12 mensalidades.
3. Configure na Kiwify a entrega do link do Google Drive aos assinantes. Mantenha no Drive as pastas de cada criador e live e adicione os cortes novos ao acervo.

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
