const path = require('path');
const fs = require('fs');

// Initial seed posts with high-resolution Unsplash space imagery
const INITIAL_POSTS = [
  {
    id: 1,
    title: "James Webb Unveils the Oldest Known Galaxy at the Dawn of Time",
    category: "Deep Space",
    author: "Dr. Evelyn Vance",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80",
    summary: "Astronomers utilizing the James Webb Space Telescope have identified JADES-GS-z14-0, a massive galaxy formed just 290 million years after the Big Bang.",
    content: `Astronomers utilizing the James Webb Space Telescope (JWST) have shattered previous records by uncovering JADES-GS-z14-0, an extraordinarily luminous galaxy existing merely 290 million years following the Big Bang.

### The Cosmic Dawn Mystery
For decades, cosmologists believed the early universe was populated only by small, faint proto-galaxies. However, spectroscopic confirmation by Webb's NIRSpec (Near-Infrared Spectrograph) reveals that this cosmic titan spans over 1,600 light-years across and possesses a stellar mass equivalent to several hundred million suns.

"The size of the galaxy immediately proves that much of the light is being produced by stars, rather than gas falling onto an accreting supermassive black hole," explained the research leads.

### Oxygen in the Primeval Universe
Even more startling is the distinct chemical footprint of ionized oxygen detected across the galaxy. Because oxygen is forged exclusively inside massive stars that subsequently explode as supernovae, its presence this early indicates multiple generations of stars had already lived and died within the first 300 million years of cosmic time.

Webb continues to challenge our fundamental theories of early cosmological structure formation, opening entirely new horizons for deep space exploration.`,
    readTime: "4 min read",
    likes: 42,
    createdAt: "2026-09-20 14:30"
  },
  {
    id: 2,
    title: "Searching for Biosignatures in Europa's Subsurface Ocean",
    category: "Exoplanets",
    author: "Marcus Thorne",
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&w=1200&q=80",
    summary: "NASA's Europa Clipper mission sets off to analyze plumes of water vapor erupting from Jupiter's icy moon to determine habitability.",
    content: `Beneath an icy crust estimated to be 15 to 25 kilometers thick lies an ocean containing more than double the volume of all Earth's oceans combined. Jupiter's moon Europa stands as our solar system's premier candidate in the search for extraterrestrial biology.

### Geothermal Vents and the Spark of Life
Life as we know it requires three fundamental ingredients: liquid water, essential chemical building blocks (carbon, hydrogen, nitrogen, oxygen, phosphorus, sulfur), and an energy source. 

On Earth, hydrothermal vents at the ocean floor support thriving ecosystems completely cut off from sunlight. Europa experiences extreme tidal flexing caused by the gravitational tug-of-war between Jupiter, Io, and Ganymede. This tidal friction heats Europa's rocky interior, creating submarine volcanic activity identical to Earth's seafloor vents.

### The Europa Clipper Science Arsenal
Equipped with nine high-precision scientific instruments—including ice-penetrating radar (REASON) and mass spectrometers capable of tasting atmospheric particles—the Clipper mission will execute nearly 50 close flybys, mapping surface composition and hunting for active organic molecules escaping through surface fissures.`,
    readTime: "5 min read",
    likes: 29,
    createdAt: "2026-09-22 09:15"
  },
  {
    id: 3,
    title: "Event Horizon: How Supermassive Black Holes Warp Spacetime",
    category: "Astrophysics",
    author: "Elena Rostova",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    summary: "New polarized observations of Sagittarius A* demonstrate powerful magnetic fields spiraling around the Milky Way's central cosmic leviathan.",
    content: `Four million times the mass of our Sun, Sagittarius A* rests at the gravitational heart of our galaxy. Recent discoveries by the international Event Horizon Telescope (EHT) collaboration have revealed that orderly magnetic fields coil tightly around its event horizon.

### Gravitational Lensing and Relativistic Beaming
When matter spirals toward the event horizon at nearly the speed of light, friction heats plasma to billions of degrees. As photons graze the threshold, spacetime itself is so violently distorted that light rays orbit the black hole in closed circles before either plunging inside or escaping to reach our telescopes.

This produces the iconic luminous ring: an optical silhouette of infinite gravitational curvature.

### Testing Einstein's Limits
General Relativity has passed every observational test with flying colors. By studying how magnetic polarization guides accretion flows, physicists are probing the frontier where Einstein's equations meet quantum gravity—the ultimate holy grail of modern theoretical physics.`,
    readTime: "6 min read",
    likes: 58,
    createdAt: "2026-09-24 18:40"
  },
  {
    id: 4,
    title: "Artemis & Beyond: Engineering the Lunar Gateway for Deep Space",
    category: "Missions",
    author: "Commander Sarah Chen",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    summary: "As humanity prepares permanent infrastructure on the Moon, the Gateway space station serves as the staging ground for manned Mars exploration.",
    content: `The Artemis program is not merely a rerun of Apollo—it is humanity's sustainable bridgehead into deep space. Crucial to this architecture is the Lunar Gateway, an international space station positioned in a Near-Rectilinear Halo Orbit (NRHO).

### Why the Halo Orbit Matters
The NRHO provides stable communications with Earth and continuous line-of-sight to the lunar south pole, where deep permanently shadowed craters harbor billions of tons of water ice. 

Water ice is more than drinking water—it is hydrogen and oxygen fuel. Refining rocket propellant directly on the Moon eliminates the staggering cost of hauling fuel out of Earth's deep gravitational well.

### Stepping Stone to Mars
With ion propulsion systems, autonomous docking ports, and radiation-shielded crew modules, Gateway will validate long-duration life support systems required for the 3-year journey to Mars and back.`,
    readTime: "4 min read",
    likes: 35,
    createdAt: "2026-09-25 11:20"
  }
];

const INITIAL_COMMENTS = [
  {
    id: 1,
    postId: 1,
    author: "Stargazer99",
    content: "The fact that oxygen formed so quickly after the Big Bang is mind-blowing! JWST never fails to amaze.",
    createdAt: "2026-09-21 16:45"
  },
  {
    id: 2,
    postId: 1,
    author: "CosmoStudent",
    content: "Our astronomy professor talked about JADES-GS-z14-0 yesterday. Incredible write-up!",
    createdAt: "2026-09-22 10:12"
  },
  {
    id: 3,
    postId: 2,
    author: "AstroBio_Dan",
    content: "Hydrothermal vents on Europa are our best shot at finding independent abiogenesis. Can't wait for the Clipper flybys!",
    createdAt: "2026-09-23 08:30"
  }
];

let dbInstance = null;
let useJsonFallback = false;
const jsonFilePath = path.join(__dirname, 'blog_data.json');

// Attempt SQLite connection; fallback to robust JSON store if sqlite3 driver isn't installed
try {
  const sqlite3 = require('sqlite3').verbose();
  const dbPath = path.join(__dirname, 'blog.db');
  dbInstance = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.warn("⚠️ SQLite initialization failed. Switching to JSON File Database.", err.message);
      useJsonFallback = true;
      initJsonDb();
    } else {
      console.log("🚀 Connected to SQLite database: blog.db");
      initSqliteDb();
    }
  });
} catch (e) {
  console.log("ℹ️ Running in JSON file database mode (sqlite3 native package optional).");
  useJsonFallback = true;
  initJsonDb();
}

function initSqliteDb() {
  dbInstance.serialize(() => {
    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        readTime TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL
      )
    `);

    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
      )
    `);

    // Check if table is empty; if so, insert seed data
    dbInstance.get("SELECT COUNT(*) AS count FROM posts", (err, row) => {
      if (err) return;
      if (row.count === 0) {
        console.log("✨ Seeding initial cosmic articles into database...");
        const stmt = dbInstance.prepare(`
          INSERT INTO posts (id, title, category, author, imageUrl, summary, content, readTime, likes, createdAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        INITIAL_POSTS.forEach(p => {
          stmt.run(p.id, p.title, p.category, p.author, p.imageUrl, p.summary, p.content, p.readTime, p.likes, p.createdAt);
        });
        stmt.finalize();

        const commentStmt = dbInstance.prepare(`
          INSERT INTO comments (id, postId, author, content, createdAt)
          VALUES (?, ?, ?, ?, ?)
        `);
        INITIAL_COMMENTS.forEach(c => {
          commentStmt.run(c.id, c.postId, c.author, c.content, c.createdAt);
        });
        commentStmt.finalize();
        console.log("🌌 Seed data successfully stored in SQLite!");
      }
    });
  });
}

function initJsonDb() {
  if (!fs.existsSync(jsonFilePath)) {
    const data = {
      posts: INITIAL_POSTS,
      comments: INITIAL_COMMENTS,
      nextPostId: INITIAL_POSTS.length + 1,
      nextCommentId: INITIAL_COMMENTS.length + 1
    };
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    console.log("🌌 Created initial blog_data.json store.");
  }
}

function readJsonData() {
  try {
    return JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  } catch (e) {
    return { posts: INITIAL_POSTS, comments: INITIAL_COMMENTS, nextPostId: 10, nextCommentId: 10 };
  }
}

function writeJsonData(data) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
}

// Unified Database Methods (Promise-based)
const db = {
  getAllPosts: (search = '', category = '') => {
    return new Promise((resolve, reject) => {
      if (useJsonFallback || !dbInstance) {
        const data = readJsonData();
        let list = data.posts;
        if (category && category.toLowerCase() !== 'all') {
          list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        if (search) {
          const q = search.toLowerCase();
          list = list.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q));
        }
        return resolve([...list].reverse());
      }

      let query = "SELECT * FROM posts WHERE 1=1";
      const params = [];
      if (category && category.toLowerCase() !== 'all') {
        query += " AND LOWER(category) = LOWER(?)";
        params.push(category);
      }
      if (search) {
        query += " AND (LOWER(title) LIKE LOWER(?) OR LOWER(content) LIKE LOWER(?) OR LOWER(summary) LIKE LOWER(?))";
        const term = `%${search}%`;
        params.push(term, term, term);
      }
      query += " ORDER BY id DESC";

      dbInstance.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getPostById: (id) => {
    return new Promise((resolve, reject) => {
      const numId = parseInt(id, 10);
      if (useJsonFallback || !dbInstance) {
        const data = readJsonData();
        const post = data.posts.find(p => p.id === numId);
        if (!post) return resolve(null);
        const comments = data.comments.filter(c => c.postId === numId).reverse();
        return resolve({ ...post, comments });
      }

      dbInstance.get("SELECT * FROM posts WHERE id = ?", [numId], (err, post) => {
        if (err) return reject(err);
        if (!post) return resolve(null);

        dbInstance.all("SELECT * FROM comments WHERE postId = ? ORDER BY id DESC", [numId], (err2, comments) => {
          if (err2) return reject(err2);
          resolve({ ...post, comments: comments || [] });
        });
      });
    });
  },

  createPost: ({ title, category, author, imageUrl, summary, content }) => {
    return new Promise((resolve, reject) => {
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
      const words = content.trim().split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(words / 180))} min read`;
      const finalImage = imageUrl || "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80";

      if (useJsonFallback || !dbInstance) {
        const data = readJsonData();
        const newPost = {
          id: data.nextPostId++,
          title,
          category,
          author: author || "Stellar Explorer",
          imageUrl: finalImage,
          summary: summary || content.substring(0, 140) + '...',
          content,
          readTime,
          likes: 0,
          createdAt: dateStr
        };
        data.posts.push(newPost);
        writeJsonData(data);
        return resolve(newPost);
      }

      const sql = `
        INSERT INTO posts (title, category, author, imageUrl, summary, content, readTime, likes, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
      `;
      const fallbackSummary = summary || content.substring(0, 140) + '...';
      const finalAuthor = author || "Stellar Explorer";

      dbInstance.run(sql, [title, category, finalAuthor, finalImage, fallbackSummary, content, readTime, dateStr], function(err) {
        if (err) return reject(err);
        resolve({
          id: this.lastID,
          title,
          category,
          author: finalAuthor,
          imageUrl: finalImage,
          summary: fallbackSummary,
          content,
          readTime,
          likes: 0,
          createdAt: dateStr
        });
      });
    });
  },

  deletePost: (id) => {
    return new Promise((resolve, reject) => {
      const numId = parseInt(id, 10);
      if (useJsonFallback || !dbInstance) {
        const data = readJsonData();
        data.posts = data.posts.filter(p => p.id !== numId);
        data.comments = data.comments.filter(c => c.postId !== numId);
        writeJsonData(data);
        return resolve(true);
      }

      dbInstance.run("DELETE FROM comments WHERE postId = ?", [numId], () => {
        dbInstance.run("DELETE FROM posts WHERE id = ?", [numId], function(err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        });
      });
    });
  },

  likePost: (id) => {
    return new Promise((resolve, reject) => {
      const numId = parseInt(id, 10);
      if (useJsonFallback || !dbInstance) {
        const data = readJsonData();
        const post = data.posts.find(p => p.id === numId);
        if (!post) return resolve(null);
        post.likes = (post.likes || 0) + 1;
        writeJsonData(data);
        return resolve(post.likes);
      }

      dbInstance.run("UPDATE posts SET likes = likes + 1 WHERE id = ?", [numId], function(err) {
        if (err) return reject(err);
        dbInstance.get("SELECT likes FROM posts WHERE id = ?", [numId], (err2, row) => {
          if (err2 || !row) resolve(0);
          else resolve(row.likes);
        });
      });
    });
  },

  addComment: (postId, author, content) => {
    return new Promise((resolve, reject) => {
      const numPostId = parseInt(postId, 10);
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
      const finalAuthor = author.trim() || "Anonymous Explorer";

      if (useJsonFallback || !dbInstance) {
        const data = readJsonData();
        const newComment = {
          id: data.nextCommentId++,
          postId: numPostId,
          author: finalAuthor,
          content: content.trim(),
          createdAt: dateStr
        };
        data.comments.push(newComment);
        writeJsonData(data);
        return resolve(newComment);
      }

      const sql = "INSERT INTO comments (postId, author, content, createdAt) VALUES (?, ?, ?, ?)";
      dbInstance.run(sql, [numPostId, finalAuthor, content.trim(), dateStr], function(err) {
        if (err) return reject(err);
        resolve({
          id: this.lastID,
          postId: numPostId,
          author: finalAuthor,
          content: content.trim(),
          createdAt: dateStr
        });
      });
    });
  }
};

module.exports = db;
