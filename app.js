// CosmoVerse - Main Application Script (Vanilla JS)
let currentCategory = 'all';
let currentSearch = '';
let searchTimeout = null;

const postsGrid = document.getElementById('postsGrid');
const heroSpotlight = document.getElementById('heroSpotlight');
const postCountBadge = document.getElementById('postCountBadge');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryChips = document.getElementById('categoryChips');

// Fetch and render posts from client storage
function fetchPosts() {
  try {
    const posts = BlogStorage.getAllPosts(currentSearch, currentCategory);
    renderPosts(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    postsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--accent-pink); padding: 3rem;">
        Failed to load transmissions from local star-charts.
      </div>
    `;
  }
}

// Render hero spotlight and card grid
function renderPosts(posts) {
  postCountBadge.textContent = `${posts.length} Dispatches`;

  if (posts.length === 0) {
    postsGrid.innerHTML = '';
    heroSpotlight.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  // Render hero section (only show if not searching, and viewing all categories)
  if (currentCategory === 'all' && !currentSearch && posts.length > 0) {
    const featured = posts[0];
    heroSpotlight.style.display = 'grid';
    heroSpotlight.innerHTML = `
      <div class="hero-img-wrap">
        <img src="${featured.imageUrl}" alt="${escapeHtml(featured.title)}">
      </div>
      <div class="hero-content">
        <span class="spotlight-badge">★ Deep Space Spotlight</span>
        <h1 class="hero-title">${escapeHtml(featured.title)}</h1>
        <p class="hero-desc">${escapeHtml(featured.summary)}</p>
        <div class="meta-row" style="margin-bottom: 1.5rem;">
          <span>👨‍🚀 ${escapeHtml(featured.author)}</span>
          <span>📅 ${featured.createdAt.split(' ')[0]}</span>
          <span>⏱️ ${featured.readTime}</span>
        </div>
        <div>
          <a href="post.html?id=${featured.id}" class="btn-primary">
            <span>Read Full Transmission →</span>
          </a>
        </div>
      </div>
    `;
  } else {
    heroSpotlight.style.display = 'none';
  }

  // Render post cards
  postsGrid.innerHTML = posts.map(post => `
    <article class="post-card">
      <a href="post.html?id=${post.id}">
        <img class="post-card-img" src="${post.imageUrl}" alt="${escapeHtml(post.title)}" loading="lazy">
      </a>
      <div class="post-card-body">
        <div class="card-tags">
          <span class="category-tag">${escapeHtml(post.category)}</span>
          <span class="card-read-time">⏱️ ${post.readTime}</span>
        </div>
        <h3 class="post-card-title">
          <a href="post.html?id=${post.id}">${escapeHtml(post.title)}</a>
        </h3>
        <p class="post-card-desc">${escapeHtml(post.summary)}</p>
        <div class="post-card-footer">
          <span>👨‍🚀 ${escapeHtml(post.author)}</span>
          <span class="likes-counter">♥ ${post.likes || 0}</span>
        </div>
      </div>
    </article>
  `).join('');
}

// Category filter button listeners
categoryChips.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip-btn');
  if (!btn) return;

  document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  currentCategory = btn.dataset.category;
  fetchPosts();
});

// Search input listener with debouncing
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = e.target.value.trim();
    fetchPosts();
  }, 200);
});

// Reset search and filters
function resetFilters() {
  searchInput.value = '';
  currentSearch = '';
  currentCategory = 'all';
  document.querySelectorAll('.chip-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.category === 'all');
  });
  fetchPosts();
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initial load
document.addEventListener('DOMContentLoaded', fetchPosts);
