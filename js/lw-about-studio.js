(() => {
  const roomMeta = {
    a: {
      title: 'A Room',
      sub: 'Control',
      thumb: '/images/studio/rooms/a-comp.jpg',
      full: '/images/studio/rooms/a.jpg'
    },
    a2: {
      title: 'A Room',
      sub: 'Live',
      thumb: '/images/studio/rooms/a2-comp.jpg',
      full: '/images/studio/rooms/a2.jpg'
    },
    b: {
      title: 'B Room',
      sub: 'Editing',
      thumb: '/images/studio/rooms/b-comp.jpg',
      full: '/images/studio/rooms/b.jpg'
    },
    c: {
      title: 'C Room',
      sub: '',
      thumb: '/images/studio/rooms/c-comp.jpg',
      full: '/images/studio/rooms/c.jpg'
    },
    d: {
      title: 'D Room',
      sub: '',
      thumb: '/images/studio/rooms/d-comp.jpg',
      full: '/images/studio/rooms/d.jpg'
    },
    lounge: {
      title: 'Lounge',
      sub: '',
      thumb: '/images/studio/rooms/lounge-comp.jpg',
      full: '/images/studio/rooms/lounge.jpg'
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

  let currentRoom = null;
  let loadToken = 0;

  function showRoom(key) {
    const meta = roomMeta[key];
    if (!meta || !previewFrame || !previewImg) return;

    currentRoom = key;
    loadToken += 1;
    const thisLoad = loadToken;

    // show compressed image first
    previewImg.src = meta.thumb;
    previewImg.alt = meta.sub ? `${meta.title} (${meta.sub})` : meta.title;

    if (titleEl) titleEl.textContent = meta.title;
    if (subEl) subEl.textContent = meta.sub || '';

    previewFrame.classList.add('is-showing');

    // preload full image, then swap only if this is still the latest hover
    const fullImg = new Image();
    fullImg.onload = () => {
      if (thisLoad !== loadToken) return;
      if (currentRoom !== key) return;
      previewImg.src = meta.full;
    };
    fullImg.src = meta.full;
  }

  document.querySelectorAll('.lw-hotspot').forEach(h => {
    const key = h.dataset.room;

    h.addEventListener('mouseenter', () => showRoom(key));
    h.addEventListener('focus', () => showRoom(key));

    h.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
})();