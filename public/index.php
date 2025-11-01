<?php
declare(strict_types=1);

$basePath = __DIR__;
$views    = dirname(__DIR__) . '/views';

$uriPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
$baseUrl = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') ?: '';
if ($baseUrl && str_starts_with($uriPath, $baseUrl)) {
  $uriPath = substr($uriPath, strlen($baseUrl));
}
$slug = trim($uriPath, '/');

$page = $_GET['p'] ?? ($slug !== '' ? $slug : 'home');

$allowed = ['home', 'about'];
if (!in_array($page, $allowed, true)) {
  http_response_code(404);
  $page = 'home';
}

$__view = $views . '/' . $page . '.php';
require $views . '/layout.php';
