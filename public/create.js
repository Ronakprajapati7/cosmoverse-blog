const createPostForm = document.getElementById('createPostForm');
const postTitle = document.getElementById('postTitle');
const postCategory = document.getElementById('postCategory');
const postAuthor = document.getElementById('postAuthor');
const postImageUrl = document.getElementById('postImageUrl');
const postSummary = document.getElementById('postSummary');
const postContent = document.getElementById('postContent');
const submitBtn = document.getElementById('submitBtn');
const presetThumbs = document.querySelectorAll('.preset-thumb');

// Default image selection
if (presetThumbs.length > 0) {
  postImageUrl.value = presetThumbs[0].dataset.url;
}

// Preset thumbnail click handler
presetThumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    presetThumbs.forEach(t => t.classList.remove('selected'));
    thumb.classList.add('selected');
    postImageUrl.value = thumb.dataset.url;
  });
});

// Form submit
createPostForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = postTitle.value.trim();
  const category = postCategory.value;
  const author = postAuthor.value.trim() || 'Cosmic Explorer';
  const imageUrl = postImageUrl.value.trim() || 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80';
  const summary = postSummary.value.trim();
  const content = postContent.value.trim();

  if (!title || !content) {
    alert("Please provide both a headline and content for your transmission.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>🚀 Broadcasting...</span>`;

  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        author,
        imageUrl,
        summary,
        content
      })
    });

    const data = await res.json();

    if (data.success && data.post) {
      alert("Transmission successfully broadcast to the CosmoVerse!");
      window.location.href = `post.html?id=${data.post.id}`;
    } else {
      alert(data.message || "Failed to transmit post.");
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>🚀 Broadcast Transmission</span>`;
    }
  } catch (err) {
    console.error("Error creating post:", err);
    alert("Connection error while broadcasting transmission.");
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>🚀 Broadcast Transmission</span>`;
  }
});
