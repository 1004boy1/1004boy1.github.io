(() => {
  const roomMeta = {
    a: {
      title: 'A Room',
      sub: 'Control',
      img: '/images/studio/rooms/a.jpg'
    },
    a2: {
      title: 'A Room',
      sub: 'Live',
      img: '/images/studio/rooms/a2.jpg'
    },
    b: {
      title: 'B Room',
      sub: 'Editing',
      img: '/images/studio/rooms/b.jpg'
    },
    c: {
      title: 'C Room',
      sub: '',
      img: '/images/studio/rooms/c.jpg'
    },
    d: {
      title: 'D Room',
      sub: '',
      img: '/images/studio/rooms/d.jpg'
    },
    lounge: {
      title: 'Lounge',
      sub: '',
      img: '/images/studio/rooms/lounge.jpg'
    }
  };

  // Tabs
  const tabs = document.querySelectorAll('.lw-tab');
  const panels = {
    studio: document.getElementById('lw-panel-studio'),
    hardware: document.getElementById('lw-panel-hardware'),
    team: document.getElementById('lw-panel-team'),
  };

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const key = btn.dataset.tab;
      Object.entries(panels).forEach(([k, el]) => {
        if (!el) return;
        el.classList.toggle('is-active', k === key);
      });
    });
  });

  // Preview elements
  const previewFrame = document.getElementById('lw-preview-frame');
  const previewImg = document.getElementById('lw-preview-img');
  const titleEl = document.getElementById('lw-preview-title');
  const subEl = document.getElementById('lw-preview-sub');

  function showRoom(key) {
    const meta = roomMeta[key];
    if (!meta || !previewFrame || !previewImg) return;

    previewImg.src = meta.img;
    previewImg.alt = meta.sub ? `${meta.title} (${meta.sub})` : meta.title;

    if (titleEl) titleEl.textContent = meta.title;
    if (subEl) subEl.textContent = meta.sub || '';

    previewFrame.classList.add('is-showing');
  }

  document.querySelectorAll('.lw-hotspot').forEach(h => {
    const key = h.dataset.room;

    h.addEventListener('mouseenter', () => showRoom(key));
    h.addEventListener('focus', () => showRoom(key));

    // optional: prevent click from doing anything
    h.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
})();