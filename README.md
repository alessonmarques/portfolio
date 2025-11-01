# Portfolio PHP — 2 páginas

**Requisitos:** PHP 8+

```bash
php -S localhost:8000 -t public
```

Abra http://localhost:8000

### Rotas
- `//home` — Home
- `//sobre` — Sobre/Contato

### Tradução
- Seletor no topo (pt-BR / en)
- Também funciona `?lang=en` e persiste em `localStorage`

### Layout
- Um layout único (`views/layout.php`) injeta a view selecionada (`views/*.php`).
- Navegação contém **apenas 2 itens**.
