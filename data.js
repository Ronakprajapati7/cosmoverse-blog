// CosmoVerse Data Storage (Pure Vanilla JS & LocalStorage)
// No server, Node.js, or external database required!

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

const STORAGE_KEYS = {
  POSTS: 'cosmoverse_posts',
  COMMENTS: 'cosmoverse_comments'
};

// Storage helper functions
const BlogStorage = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_COMMENTS));
    }
  },

  getAllPosts(search = '', category = 'all') {
    this.init();
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    
    if (category && category.toLowerCase() !== 'all') {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.summary && p.summary.toLowerCase().includes(q)) ||
        (p.content && p.content.toLowerCase().includes(q)) ||
        (p.author && p.author.toLowerCase().includes(q))
      );
    }

    return posts;
  },

  getPostById(id) {
    this.init();
    const numId = parseInt(id, 10);
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const post = posts.find(p => p.id === numId);
    if (!post) return null;

    const allComments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS)) || [];
    const postComments = allComments.filter(c => c.postId === numId).reverse();

    return { ...post, comments: postComments };
  },

  createPost({ title, category, author, imageUrl, summary, content }) {
    this.init();
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
    const words = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(words / 180))} min read`;
    const finalImage = imageUrl || "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80";
    const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

    const newPost = {
      id: nextId,
      title,
      category,
      author: author || "Cosmic Explorer",
      imageUrl: finalImage,
      summary: summary || content.substring(0, 140) + '...',
      content,
      readTime,
      likes: 0,
      createdAt: dateStr
    };

    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return newPost;
  },

  deletePost(id) {
    this.init();
    const numId = parseInt(id, 10);
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    posts = posts.filter(p => p.id !== numId);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

    let comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS)) || [];
    comments = comments.filter(c => c.postId !== numId);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    return true;
  },

  likePost(id) {
    this.init();
    const numId = parseInt(id, 10);
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const post = posts.find(p => p.id === numId);
    if (!post) return 0;

    post.likes = (post.likes || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return post.likes;
  },

  addComment(postId, author, content) {
    this.init();
    const numPostId = parseInt(postId, 10);
    const comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS)) || [];
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
    const nextId = comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1;

    const newComment = {
      id: nextId,
      postId: numPostId,
      author: author.trim() || "Anonymous Explorer",
      content: content.trim(),
      createdAt: dateStr
    };

    comments.push(newComment);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    return newComment;
  }
};

// Initialize default data if empty
BlogStorage.init();
