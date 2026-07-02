# Thiago Paulino — Landing Page Final

## Estrutura

- `index.html` — estrutura semântica da landing page.
- `styles.css` — estilos organizados por blocos.
- `script.js` — menu, header, animações leves e lazy loading de vídeos.
- `assets/img` — imagens finais usadas por seção.
- `assets/video` — vídeos carregados sob demanda.
- `assets/posters` — capas dos vídeos.

## Assets por seção

- Hero e header: `thiago-paulino.png`.
- Sobre: `thiago-apresentacao.webp`.
- Noivas: `o-seu-grande-dia-merece.webp`, `coroando-noiva.webp`, `noiva-passando-laque.webp`.
- Debutantes: `debutante-vestido-2.webp`, vídeos e posters de debutante.
- Cursos: `conhecimento-transforma-carreiras.webp`.
- Espaço: `espaco-pensado.mp4` com poster dedicado.

## Performance

- Imagem principal com preload e `fetchpriority="high"`.
- Imagens abaixo da dobra com `loading="lazy"` e `decoding="async"`.
- Vídeos com `preload="none"`, carregados por `IntersectionObserver`.
- Scroll do header controlado com `requestAnimationFrame`.
- Código em UTF-8 real.

## Refinamento de qualidade visual

- Fotos menores de noiva deixam de ser ampliadas além do ideal e passam a usar enquadramento protegido.
- Vídeos verticais foram limitados visualmente para não parecerem pixelados em telas grandes.
- Imagens e vídeos receberam tratamento CSS leve de contraste, saturação e brilho.
- O banner de cursos usa enquadramento sem corte agressivo para preservar leitura da colagem.

## Rodada de refinamento global

- Hero reforçado com retrato do Thiago e mini galeria contextual.
- Seção de serviços ganhou composição editorial com imagens antes dos cards.
- Sobre ganhou bloco de diferenciais para quebrar a massa de texto.
- Noivas ganhou tags de jornada/atendimento.
- Cursos ganhou bloco visual de prova e chamada de formação.
- CTA final ganhou imagem e vídeo de evento.
- Vídeos principais foram trocados por versões maiores da pasta Cabeleleiro.
- Validação feita: caminhos sem quebra, UTF-8 íntegro e vídeos servindo como video/mp4.
