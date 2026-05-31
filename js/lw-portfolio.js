(() => {
  const tabs = document.querySelectorAll('body.lw-portfolio-page .lw-tab');
  const panels = {
    films: document.getElementById('lw-panel-films'),
    music: document.getElementById('lw-panel-music'),
    contents: document.getElementById('lw-panel-contents'),
  };

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.forEach((tab) => {
        tab.classList.remove('is-active');
        tab.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const key = btn.dataset.tab;
      Object.entries(panels).forEach(([panelKey, panel]) => {
        if (!panel) return;
        panel.classList.toggle('is-active', panelKey === key);
      });
    });
  });
})();
