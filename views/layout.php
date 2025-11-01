<!doctype html>
<html lang="pt-BR" data-theme="link">
<!--
           _                                                      _          
     /\   | |                                                    | |         
    /  \  | | ___  ___ ___  ___  _ __      ___ ___  _ __ ___     | |__  _ __ 
   / /\ \ | |/ _ \/ __/ __|/ _ \| '_ \    / __/ _ \| '_ ` _ \    | '_ \| '__|
  / ____ \| |  __/\__ \__ \ (_) | | | |  | (_| (_) | | | | | |  _| |_) | |   
 /_/    \_\_|\___||___/___/\___/|_| |_| (_)___\___/|_| |_| |_| (_)_.__/|_|   
                                                                                                                                                                                                                 
Created by Alesson Marques - https://alesson.com.br/


Github: https://github.com/AlessonMarques
LinkedIn: https://www.linkedin.com/in/alessonmarques/
X: https://x.com/aneccoh


E-mail: alessonmarques@live.com

-->
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($site['title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($site['description']) ?>">
    <meta name="theme-color" content="#202916">
    <meta name="color-scheme" content="main link wario omen">
    <link rel="icon" type="image/jpeg" href="/assets/favicon.png">
    <script>
        (function () {
            const saved = localStorage.getItem('theme');
            const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', saved || 'main');
            document.documentElement.style.colorScheme = saved || 'main';
        })();
    </script>
    <link rel="stylesheet" href="<?= $site['baseUrl'] ?>/assets/app.min.css?v=<?= filemtime('assets/app.min.css') ?>">

  </head>

  <body class="d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable" href="#main" data-i18n-anim="off" data-i18n="a11y.skip">Pular para o conteúdo</a>

    <header class="header" role="banner">
      <div class="container header-content d-flex align-items-center justify-content-between py-3">
        <a class="brand text-decoration-none fw-bold" href="<?= $site['baseUrl'] ?>/?p=home">Alesson</a>

        <div class="actions d-inline-flex align-items-center gap-2">
          <nav class="nav" role="navigation" aria-label="Primary">
            <ul class="nav-menu nav mb-0" id="nav-menu">
              <li class="nav-item">
                <a class="nav-link link-sub-marker nav-link px-2" data-i18n="nav.home" href="<?= $site['baseUrl'] ?>/?p=home">Início</a>
              </li>
              <li class="nav-item">
                <a class="nav-link link-sub-marker nav-link px-2" data-i18n="nav.about" href="<?= $site['baseUrl'] ?>/?p=about">Sobre</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main id="main" class="flex-grow-1">
      <div class="container py-5">
        <?php require $__view; ?>
        <?php require __DIR__ . '/partials/gooey.php'; ?>
        <?php require __DIR__ . '/partials/flag.php'; ?>
      </div>
    </main>

    <footer class="footer" role="contentinfo">
      <div class="container footer-content d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <p class="mb-0"><strong>© <span id="year"></span></strong> <span>Alesson Marques</span></p>
        <p class="mb-0" data-i18n="footer.rights">Todos os direitos reservados.</p>
      </div>
    </footer>


    <script src="<?= $site['baseUrl'] ?>/assets/app.min.js?v=<?= filemtime('assets/app.min.js') ?>" type="module"></script>
    <script>
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
  </body>
</html>
