<!doctype html>
<html lang="pt-BR" data-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($site['title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($site['description']) ?>">
    <meta name="theme-color" content="#202916">

    <!-- Bootstrap CSS (5.3) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Seu CSS -->
    <link rel="stylesheet" href="<?= $site['baseUrl'] ?>/assets/main.css">
  </head>

  <body class="d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable" href="#main" data-i18n="a11y.skip">Pular para o conteúdo</a>

    <header class="header" role="banner">
      <div class="container header__inner d-flex align-items-center justify-content-between py-3">
        <a class="brand text-decoration-none fw-bold" href="<?= $site['baseUrl'] ?>/?p=home">Alesson</a>

        <div class="actions d-inline-flex align-items-center gap-2">
          <nav class="nav" role="navigation" aria-label="Primary">
            <ul class="nav__menu nav mb-0" id="nav-menu">
              <li class="nav-item">
                <a class="nav__link nav-link px-2" data-i18n="nav.home" href="<?= $site['baseUrl'] ?>/?p=home">Início</a>
              </li>
              <li class="nav-item">
                <a class="nav__link nav-link px-2" data-i18n="nav.about" href="<?= $site['baseUrl'] ?>/?p=about">Sobre</a>
              </li>
            </ul>
          </nav>
          
          <label class="visually-hidden" for="lang">Idioma</label>
          <select id="lang" class="form-select form-select-sm" style="width:auto">
            <option value="pt-BR">Português</option>
            <option value="en">English</option>
          </select>
  <!---
          <button class="iconbtn btn btn-sm btn-outline-secondary" id="theme-toggle" aria-pressed="false" title="Toggle theme">
            <span class="visually-hidden" data-i18n="ui.toggleTheme">Alternar tema</span>
            <svg width="24" height="24" aria-hidden="true">
              <use href="<?= $site['baseUrl'] ?>/icons/icons.svg#sun"></use>
            </svg>
          </button>
  --->
        </div>
      </div>
    </header>

    <main id="main" class="flex-grow-1">
        <div class="container py-5">
          <?php require $__view; ?>
        </div>
    </main>

    <footer class="footer" role="contentinfo">
      <div class="container footer__inner d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">

        <p class="mb-0"><strong>© <span id="year"></span></strong> <span>Alesson Marques</span></p>
        <p class="mb-0" data-i18n="footer.rights">Todos os direitos reservados.</p>
      </div>
    </footer>

    <!-- Bootstrap JS (opcional, para componentes que precisem de JS) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>

    <!-- Seus scripts -->
    <script src="<?= $site['baseUrl'] ?>/assets/i18n.js" type="module"></script>
    <script src="<?= $site['baseUrl'] ?>/assets/main.js" type="module"></script>
    <script>
      // ano no footer
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
  </body>
</html>
