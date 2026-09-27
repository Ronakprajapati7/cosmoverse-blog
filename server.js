const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// REST API ROUTES
// ==========================================

// 1. Get all posts (supports ?search=... and ?category=...)
app.get('/api/posts', async (req, res) => {
  try {
    const { search = '', category = '' } = req.query;
    const posts = await db.getAllPosts(search, category);
    res.json({ success: true, count: posts.length, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve cosmic archives" });
  }
});

// 2. Get single post by ID (with its comments)
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Transmission not found in star charts" });
    }
    res.json({ success: true, post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Failed to load transmission" });
  }
});

// 3. Create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, category, author, imageUrl, summary, content } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ success: false, message: "Title, category, and content are required." });
    }

    const newPost = await db.createPost({
      title,
      category,
      author,
      imageUrl,
      summary,
      content
    });

    res.status(201).json({ success: true, message: "Cosmic transmission published!", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Transmission failed to broadcast" });
  }
});

// 4. Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const success = await db.deletePost(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: "Transmission not found" });
    }
    res.json({ success: true, message: "Transmission erased from records." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: "Failed to delete transmission" });
  }
});

// 5. Like a post
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const likes = await db.likePost(req.params.id);
    if (likes === null) {
      return res.status(404).json({ success: false, message: "Transmission not found" });
    }
    res.json({ success: true, likes });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ success: false, message: "Failed to register like" });
  }
});

// 6. Add comment to a post
app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { author, content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Comment content cannot be blank." });
    }

    const comment = await db.addComment(req.params.id, author, content);
    res.status(201).json({ success: true, message: "Comment added to transmission log", comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Failed to add comment" });
  }
});

// Fallback HTML routing for clean URLs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🌌 CosmoVerse Blog Server is Launching!`);
  console.log(`🛰️  Running at: http://localhost:${PORT}`);
  console.log(`✨ Open your browser and navigate to http://localhost:${PORT}`);
  console.log(`=================================================\n`);
});
