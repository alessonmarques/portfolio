<section class="theme-goo-picker" aria-label="Seletor de tema">
  <svg width="0" height="0" aria-hidden="true" focusable="false">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
          result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>

  <div class="tg-wrap">
    <div class="tg-row">
      <div class="tg-picker" aria-expanded="false">
          <button class="tg-trigger" aria-haspopup="true" aria-expanded="false" title="Abrir temas">
            <img class="tg-icon" src="/assets/images/brush.svg"></img>
            <span class="tg-sr">Abrir seleção de temas (1)</span>
          </button>

          <div class="tg-options" role="menu" aria-label="Escolha o tema (1)">
              <button class="tg-option theme-toggle bg-theme-main" role="menuitem" data-theme-name="main" title="Main">
                  <img class="tg-icon" src="/assets/images/home.svg" alt="" aria-hidden="true" />
                  <span class="tg-sr">Tema Main</span>
              </button>

              <button class="tg-option theme-toggle bg-theme-link" role="menuitem" data-theme-name="link" title="Link">
                  <img class="tg-icon" src="/assets/images/triforce.svg" alt="" aria-hidden="true" />
                  <span class="tg-sr">Tema Link</span>
              </button>

              <button class="tg-option theme-toggle bg-theme-wario" role="menuitem" data-theme-name="wario" title="Wario">
                  <img class="tg-icon" src="/assets/images/wario-cap.svg" alt="" aria-hidden="true" />
                  <span class="tg-sr">Tema Wario</span>
              </button>

              <button class="tg-option theme-toggle bg-theme-omen" role="menuitem" data-theme-name="omen" title="Omen">
                  <img class="tg-icon" src="/assets/images/shadow.svg" alt="" aria-hidden="true" />
                  <span class="tg-sr">Tema Omen</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
