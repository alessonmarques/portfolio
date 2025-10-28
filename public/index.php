<?php
declare(strict_types=1);

$basePath = dirname(__DIR__);
$views = $basePath . '/views';

$page = $_GET['p'] ?? 'home';
$allowed = ['home', 'about'];
if (!in_array($page, $allowed, true)) {
  http_response_code(404);
  $page = 'home';
}

$site = [
  'title' => 'Alesson Marques',
  'description' => 'Portfólio simples, acessível e rápido.',
  'baseUrl' => rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') ?: '',
];

$__view = $views . '/' . $page . '.php';
require $views . '/layout.php';
