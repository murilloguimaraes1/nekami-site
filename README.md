# Nekami Culinária Japonesa — Landing Page Oficial

Landing page cinematográfica, mobile-first e de alta conversão desenvolvida para o restaurante **Nekami Culinária Japonesa**, com duas unidades físicas em São José do Rio Preto (Plaza Avenida Shopping e Shopping Iguatemi).

---

## 🚀 1. Stack Tecnológica

- **Arquitetura:** Static Web App puro (HTML5 + CSS3 Vanilla + JavaScript ES6+).
- **Sem Frameworks Pesados:** Não requer Node.js, Vite, Webpack ou compilação.
- **Performance Nativa:** Tempo de carregamento quase instantâneo, zero dependências com vulnerabilidades e compatibilidade universal com navegadores modernos.
- **Hospedagem Recomendada:** Vercel, GitHub Pages, Netlify ou qualquer servidor web/CDN estático.

---

## 💻 2. Como Executar Localmente

Como o projeto é estático puro, você pode executá-lo imediatamente com qualquer servidor HTTP local:

### Opção A: Python (Recomendado)
```bash
# Na raiz do projeto:
python -m http.server 8088
```
Acesse em seu navegador: `http://localhost:8088`

### Opção B: Node.js (npx)
```bash
npx serve .
```

### Opção C: VS Code Live Server
Abra a pasta do projeto no VS Code e clique em **"Go Live"** na barra inferior.

---

## 🌐 3. Instruções de Deploy (GitHub + Vercel)

### Passo 1: Subir o Repositório para o GitHub
```bash
git init
git add .
git commit -m "feat: landing page completa Nekami Culinaria Japonesa"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/nekami-site.git
git push -u origin main
```

### Passo 2: Publicar na Vercel
1. Acesse o painel da [Vercel](https://vercel.com) e clique em **"Add New..."** > **"Project"**.
2. Conecte sua conta do GitHub e selecione o repositório `nekami-site`.
3. Em **Framework Preset**, deixe selecionado **"Other"**.
4. **Root Directory:** `./` (deixar padrão).
5. **Build & Output Settings:** Deixe desativado (não é necessário comando de build para sites estáticos).
6. Clique em **"Deploy"**.
7. O site estará online em segundos com SSL automático, CDN global e regras de cache configuradas pelo `vercel.json`.

---

## 🛠️ 4. Onde Editar Dados e Conteúdos

Toda a arquitetura foi modularizada para facilitar futuras atualizações:

### 4.1. Unidades, Endereços, Horários e Links de Pedido
Os dados das unidades estão centralizados em dois arquivos:
1. **[`app.js`](app.js):** Objeto `NEKAMI_DATA.units`:
   - Nomes das unidades
   - Endereços e CEPs
   - Horários de funcionamento
   - Links do WhatsApp oficial
   - Links da loja oficial no iFood
   - Link do Instagram em `NEKAMI_DATA.social`
2. **[`index.html`](index.html):**
   - Seção `<section id="unidades">` (cards visuais de cada unidade com botões de iFood e WhatsApp).
   - Rodapé `<footer id="contato">` (links diretos e endereços).
   - Schema.org estruturado no `<head>` (`<script type="application/ld+json">`).

### 4.2. Carrossel de Categorias do Cardápio
- **[`index.html`](index.html):** Seção `<section id="cardapio">` no container `.carousel-track`.
- **[`app.js`](app.js):** Objeto `NEKAMI_DATA.categories` que alimenta a estrutura de categorias (Sushi & Sashimi, Temaki, Hot Roll, Poke, Combinados).

### 4.3. Imagens e Mídias
Todas as imagens estão localizadas na pasta [`images/`](images/):
- `hero_sushi.jpg` e `hero_sushi_hd.jpg`: Imagem cinematográfica do Hero.
- `logo-hero.png` e `logo-hero-2x.png`: Logomarca oficial com selo dos hashis para o Hero.
- `logo-white.png`: Logomarca para cabeçalho e rodapé.
- `og-share.jpg`: Imagem de compartilhamento em redes sociais (1200x630px).
- `menu_*.jpg`: Fotos das especialidades do cardápio.
- `unit_plaza.jpg` e `unit_iguatemi.jpg`: Fotos das fachadas das duas unidades.
- `favicon.png`: Ícone de favoritos e tela inicial mobile.

### 4.4. Estilos e Identidade Visual
- **[`style.css`](style.css):** Design system completo com variáveis CSS na raiz (`:root`), abrangendo a paleta de cores (preto carvão `#0D0D0D`, laranja salmão `#E8541E`, dourado `#D4A373`), tipografia (Syne e Plus Jakarta Sans), sombras tridimensionais e animações Ken Burns.

---

## ⚠️ 5. Regras do Negócio (Atenção em Atualizações)

1. **Separação das Unidades:** As duas lojas físicas são independentes. **Nunca misture ou unifique os números de WhatsApp ou links de iFood** do Plaza Avenida Shopping e do Shopping Iguatemi.
2. **Preços e Promoções:** O site nunca exibe preços estáticos para evitar divergências com os aplicativos. Qualquer pedido ou consulta de valores deve sempre direcionar aos links oficiais do iFood.
