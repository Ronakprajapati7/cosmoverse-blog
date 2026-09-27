// CosmoVerse - Single Post Viewer (Pure Vanilla JS & LocalStorage)
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const loadingIndicator = document.getElementById('loadingIndicator');
const articleContent = document.getElementById('articleContent');
const postBanner = document.getElementById('postBanner');
const postCategory = document.getElementById('postCategory');
const postTitle = document.getElementById('postTitle');
const postAuthor = document.getElementById('postAuthor');
const postDate = document.getElementById('postDate');
const postReadTime = document.getElementById('postReadTime');
const postBody = document.getElementById('postBody');
const likesCount = document.getElementById('likesCount');
const likeBtn = document.getElementById('likeBtn');
const deleteBtn = document.getElementById('deleteBtn');
const commentForm = document.getElementById('commentForm');
const commentAuthor = document.getElementById('commentAuthor');
const commentContent = document.getElementById('commentContent');
const commentList = document.getElementById('commentList');
const commentsCountBadge = document.getElementById('commentsCountBadge');

if (!postId) {
  window.location.href = 'index.html';
}

// Load post details from local storage
function loadPost() {
  try {
    const post = BlogStorage.getPostById(postId);

    if (!post) {
      loadingIndicator.innerHTML = `
        <h3 style="color: var(--accent-pink);">Transmission Not Found</h3>
        <p style="margin-top: 1rem;"><a href="index.html" class="btn-secondary">Return to Orbit</a></p>
      `;
      return;
    }

    renderPost(post);
  } catch (err) {
    console.error("Error loading post:", err);
    loadingIndicator.innerHTML = `<p style="color: var(--accent-pink);">Error reading deep space telemetry.</p>`;
  }
}

// Render post content into DOM
function renderPost(post) {
  document.title = `${post.title} | CosmoVerse`;
  postBanner.src = post.imageUrl;
  postBanner.alt = post.title;
  postCategory.textContent = post.category;
  postTitle.textContent = post.title;
  postAuthor.textContent = post.author;
  postDate.textContent = post.createdAt ? post.createdAt.split(' ')[0] : 'Cosmic Era';
  postReadTime.textContent = post.readTime || '3 min read';
  likesCount.textContent = post.likes || 0;

  // Format body text
  postBody.innerHTML = formatBodyContent(post.content);

  // Render comments
  renderComments(post.comments || []);

  loadingIndicator.style.display = 'none';
  articleContent.style.display = 'block';
}

// Simple Markdown parser for headings, quotes, bold, and paragraphs
function formatBodyContent(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  let inParagraph = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inParagraph) {
        html += '</p>';
        inParagraph = false;
      }
      continue;
    }

    if (trimmed.startsWith('### ')) {
      if (inParagraph) { html += '</p>'; inParagraph = false; }
      html += `<h3>${escapeHtml(trimmed.substring(4))}</h3>`;
    } else if (trimmed.startsWith('## ')) {
      if (inParagraph) { html += '</p>'; inParagraph = false; }
      html += `<h2>${escapeHtml(trimmed.substring(3))}</h2>`;
    } else if (trimmed.startsWith('> ')) {
      if (inParagraph) { html += '</p>'; inParagraph = false; }
      html += `<blockquote style="border-left: 3px solid var(--primary-cyan); padding-left: 1rem; color: var(--text-muted); font-style: italic; margin: 1.25rem 0;">${escapeHtml(trimmed.substring(2))}</blockquote>`;
    } else {
      if (!inParagraph) {
        html += '<p>';
        inParagraph = true;
      } else {
        html += '<br>';
      }
      // Replace **bold** with <strong>
      let formattedLine = escapeHtml(trimmed).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += formattedLine;
    }
  }

  if (inParagraph) html += '</p>';
  return html;
}

// Render comments list
function renderComments(comments) {
  commentsCountBadge.textContent = `${comments.length} Logged`;
  if (!comments || comments.length === 0) {
    commentList.innerHTML = `<p style="color: var(--text-muted); font-style: italic;">No crew observations yet. Be the first to log a transmission!</p>`;
    return;
  }

  commentList.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-meta">
        <span class="comment-author">👨‍🚀 ${escapeHtml(c.author)}</span>
        <span class="comment-time">${escapeHtml(c.createdAt)}</span>
      </div>
      <p class="comment-text">${escapeHtml(c.content)}</p>
    </div>
  `).join('');
}

// Like Button
likeBtn.addEventListener('click', () => {
  try {
    const newLikes = BlogStorage.likePost(postId);
    likesCount.textContent = newLikes;
    likeBtn.style.transform = 'scale(1.2)';
    setTimeout(() => likeBtn.style.transform = 'scale(1)', 200);
  } catch (err) {
    console.error("Failed to like post:", err);
  }
});

// Delete Button
deleteBtn.addEventListener('click', () => {
  const confirmed = confirm("Are you sure you want to permanently erase this cosmic transmission?");
  if (!confirmed) return;

  try {
    BlogStorage.deletePost(postId);
    alert("Transmission erased from star-charts.");
    window.location.href = 'index.html';
  } catch (err) {
    console.error("Error deleting post:", err);
    alert("Failed to delete transmission.");
  }
});

// Comment submission
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = commentAuthor.value.trim();
  const content = commentContent.value.trim();

  if (!content) return;

  try {
    BlogStorage.addComment(postId, author, content);
    commentContent.value = '';
    loadPost(); // Re-render post & updated comments
  } catch (err) {
    console.error("Error submitting comment:", err);
    alert("Failed to record observation.");
  }
});

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadPost);
