(() => {
  const roomMeta = {
    a: { title: 'A Room', sub: 'Control + Live', imgs: ['/images/studio/rooms/a.jpg', '/images/studio/rooms/a2.jpg'], idx: 0 },
    b: { title: 'B Room', sub: 'Editing', imgs: ['/images/studio/rooms/b.jpg'], idx: 0 },
    c: { title: 'C Room', sub: '', imgs: ['/images/studio/rooms/c.jpg'], idx: 0 },
    d: { title: 'D Room', sub: '', imgs: ['/images/studio/rooms/d.jpg'], idx: 0 },
    lounge: { title: 'Lounge', sub: '', imgs: ['/images/studio/rooms/lounge.jpg'], idx: 0 },
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
  const previewToggle = document.getElementById('lw-preview-toggle');

  let currentRoom = null;

  function showRoom(key) {
    const meta = roomMeta[key];
    if (!meta || !previewFrame || !previewImg) return;

    currentRoom = key;
    const src = meta.imgs[meta.idx] || meta.imgs[0];

    previewImg.src = src;
    previewImg.alt = meta.title;

    if (titleEl) titleEl.textContent = meta.title;
    if (subEl) subEl.textContent = meta.sub || '';

    if (previewToggle) {
      previewToggle.style.display = (meta.imgs.length > 1) ? 'inline-block' : 'none';
    }

    previewFrame.classList.add('is-showing');
  }

  // Hotspots: hover controls preview, click opens modal
  document.querySelectorAll('.lw-hotspot').forEach(h => {
    const key = h.dataset.room;

    h.addEventListener('mouseenter', () => showRoom(key));
    h.addEventListener('focus', () => showRoom(key));

    h.addEventListener('click', (e) => {
      e.preventDefault();
      const meta = roomMeta[key];
      if (!meta) return;
      openModal(meta.imgs[meta.idx] || meta.imgs[0], meta.title, key);
    });
  });

  // Toggle (preview) for any room with 2+ images (A room)
  if (previewToggle) {
    previewToggle.addEventListener('click', () => {
      if (!currentRoom) return;
      const meta = roomMeta[currentRoom];
      if (!meta || meta.imgs.length < 2) return;
      meta.idx = (meta.idx + 1) % meta.imgs.length;
      showRoom(currentRoom);
    });
  }

  // Modal
  const modal = document.getElementById('lw-modal');
  const modalImg = document.getElementById('lw-modal-img');
  const modalToggle = document.getElementById('lw-modal-toggle');

  function openModal(src, alt, roomKey) {
    if (!modal || !modalImg) return;

    modalImg.src = src;
    modalImg.alt = alt || '';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    if (modalToggle) {
      const meta = roomMeta[roomKey];
      modalToggle.style.display = (meta && meta.imgs.length > 1) ? 'inline-block' : 'none';
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      const close = e.target && e.target.getAttribute && e.target.getAttribute('data-close');
      if (close) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Toggle (modal) for A room
  if (modalToggle) {
    modalToggle.addEventListener('click', () => {
      const meta = roomMeta['a'];
      if (!meta || meta.imgs.length < 2) return;
      meta.idx = (meta.idx + 1) % meta.imgs.length;
      if (modalImg) modalImg.src = meta.imgs[meta.idx];
    });
  }
})();