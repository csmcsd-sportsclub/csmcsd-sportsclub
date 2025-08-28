// ===========================
// Default Site Data (used if no Firestore data yet)
// ===========================
const DEFAULT_DATA = {
  motto: "Strength in Unity",
  intro: "Welcome to our Sports Club — a vibrant community where passion meets performance. We bring together athletes and enthusiasts to train, compete, and grow through sport. From grassroots development to competitive excellence, our programs nurture discipline, teamwork, and resilience. We host regular events, workshops, and friendly matches across multiple disciplines, creating inclusive spaces for beginners and advanced players alike. Whether you’re aiming to improve fitness, develop new skills, or represent the club at tournaments, you’ll find mentors, teammates, and friends here. Join us to push your limits, celebrate effort, and build lifelong memories both on and off the field.",
  vision: "To be a premier student-led sports community recognized for inclusivity, innovation, and competitive excellence across disciplines.",
  mission: "To provide accessible training, host quality events, and promote holistic growth through fair play, leadership, and community engagement.",
  advisor: {
    name: "Dr. A. Sharma",
    title: "Faculty Advisor, Department of Physical Education",
    photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop",
    message: "Our Sports Club embodies the spirit of collective ambition. Here, we cultivate discipline, sportsmanship, and resilience through structured training and meaningful competition. Each season brings fresh opportunities to challenge limits and learn from both victory and defeat. With the guidance of dedicated coaches and the support of our vibrant community, our students grow not only as athletes but as leaders and collaborators. I encourage every member to train consistently, respect their peers, and uphold the highest standards of integrity. Together, let us continue building a culture where effort is celebrated, potential is realized, and unity drives achievement."
  },
  about: {
    history: "Founded in 2012, the Sports Club began as a small group of enthusiasts and has grown into a multi-sport community. Over the years, we’ve expanded our facilities, increased coaching support, and achieved recognition at district and state levels.",
    objectives: "To encourage participation in sports for all skill levels; organize tournaments and workshops; develop leadership through team roles; and promote well-being, inclusivity, and fair play.",
    values: "Integrity, teamwork, respect, perseverance, and continuous improvement — the pillars that shape our training ethos and community culture."
  },
  events: {
    upcoming: [
      { name: "Inter-College Athletics Meet", date: "2025-09-10", time: "09:00", location: "Main Stadium", register: "https://forms.gle/example1" },
      { name: "Basketball 3x3 Showdown", date: "2025-09-22", time: "16:00", location: "Indoor Arena", register: "https://forms.gle/example2" }
    ],
    past: [
      { title: "Spring Fitness Bootcamp", desc: "A week-long conditioning program with 120+ participants.", album: "https://drive.google.com/" },
      { title: "Freshers’ Football Cup", desc: "16 teams competed in a knockout format. Intense and fun!", album: "https://drive.google.com/" }
    ]
  },
  gallery: [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521417531039-95c1c9d94e83?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521417531039-95c1c9d94e83?q=80&w=1200&auto=format&fit=crop"
  ],
  team: [
    { name: "Riya Patel", role: "Club Coordinator", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", bio: "Leads operations, partnerships, and inter-club coordination." },
    { name: "Arjun Mehta", role: "Events Lead", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", bio: "Designs tournaments, schedules, and match-day logistics." },
    { name: "Sana Khan", role: "Training Captain", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop", bio: "Oversees training plans and beginner onboarding." }
  ],
  achievements: [
    { year: 2024, title: "State-Level Badminton Champions", desc: "Men’s and Women’s teams secured top podium finishes.", photo: "https://images.unsplash.com/photo-1521417531039-95c1c9d94e83?q=80&w=1200&auto=format&fit=crop" },
    { year: 2023, title: "Marathon Participation Milestone", desc: "200+ runners completed the city half marathon.", photo: "" },
    { year: 2022, title: "Inter-College Football Runner-Up", desc: "Strong defensive record and spirited comebacks.", photo: "" }
  ]
};

// Firestore document reference
const DATA_DOC = db.collection("site").doc("main");

// Load data from Firestore
async function loadData() {
  try {
    const doc = await DATA_DOC.get();
    if (doc.exists) return doc.data();
    await DATA_DOC.set(DEFAULT_DATA);
    return DEFAULT_DATA;
  } catch (e) {
    console.error("Failed to load data from Firestore:", e);
    return DEFAULT_DATA;
  }
}

// Save data to Firestore
async function saveData(data) {
  try {
    await DATA_DOC.set(data);
  } catch (e) {
    console.error("Failed to save data to Firestore:", e);
  }
}

// Reset data in Firestore
async function resetData() {
  await saveData(DEFAULT_DATA);
  await renderAll();
}

// Global state
let DATA = DEFAULT_DATA;

// ===========================
// RENDER FUNCTIONS
// ===========================
function renderHome(){
  document.getElementById("clubMotto").textContent = DATA.motto;
  document.getElementById("homeIntro").textContent = DATA.intro;
  document.getElementById("visionText").textContent = DATA.vision;
  document.getElementById("missionText").textContent = DATA.mission;
}

function renderAdvisor(){
  const a = DATA.advisor || {};
  document.getElementById("advisorName").textContent = a.name || "";
  document.getElementById("advisorTitle").textContent = a.title || "";
  document.getElementById("advisorMessage").textContent = a.message || "";
  const img = document.getElementById("advisorPhoto");
  img.src = a.photo || "";
}

function renderAbout(){
  const container = document.getElementById("aboutContent");
  container.innerHTML = `
    <div class="col-md-4">
      <div class="card p-4 h-100">
        <h3 class="fw-bold text-navy">History</h3>
        <p class="mb-0">${DATA.about.history}</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card p-4 h-100">
        <h3 class="fw-bold text-navy">Objectives</h3>
        <p class="mb-0">${DATA.about.objectives}</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card p-4 h-100">
        <h3 class="fw-bold text-navy">Values</h3>
        <p class="mb-0">${DATA.about.values}</p>
      </div>
    </div>`;
}

function renderEvents(){
  // Upcoming
  const up = document.getElementById("upcomingEvents");
  up.innerHTML = "";
  DATA.events.upcoming.forEach((ev, idx) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold text-navy">${ev.name}</h5>
          <p class="card-text mb-1"><i class="bi bi-calendar-event me-2"></i>${ev.date} &middot; ${ev.time}</p>
          <p class="card-text"><i class="bi bi-geo-alt me-2"></i>${ev.location}</p>
          <div class="mt-auto">
            <a class="btn btn-gold w-100" href="${ev.register || '#'}" target="_blank" rel="noopener" aria-label="Register for ${ev.name}">Register</a>
          </div>
        </div>
      </div>`;
    up.appendChild(col);
  });

  // Past
  const past = document.getElementById("pastEvents");
  past.innerHTML = "";
  DATA.events.past.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<strong>${p.title}:</strong> ${p.desc} — <a href="${p.album}" target="_blank" rel="noopener">View album</a>`;
    past.appendChild(li);
  });
}

function renderGallery(){
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";
  DATA.gallery.forEach((src, i) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <a href="${src}" class="gallery-item d-block" data-lg-size="1200-800" data-src="${src}">
        <img class="gallery-img" src="${src}" alt="Event photo ${i+1}" loading="lazy" width="600" height="400" />
      </a>`;
    grid.appendChild(col);
  });

  // (Re)initialize LightGallery
  if (window._lgInstance) { window._lgInstance.destroy(true); }
  window._lgInstance = lightGallery(document.getElementById("galleryGrid"), {
    selector: ".gallery-item",
    plugins: [lgZoom, lgThumbnail],
    thumbnail: true,
    speed: 300
  });
}

function renderTeam(){
  const grid = document.getElementById("teamGrid");
  grid.innerHTML = "";
  DATA.team.forEach((m, i) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100 text-center p-3">
        <img src="${m.photo}" class="mx-auto rounded-circle shadow" alt="${m.name} headshot" width="200" height="200" style="object-fit:cover;" loading="lazy">
        <div class="card-body">
          <h5 class="fw-bold text-navy mb-1">${m.name}</h5>
          <p class="mb-2 text-secondary">${m.role}</p>
          <p class="small mb-0">${m.bio || ""}</p>
        </div>
      </div>`;
    grid.appendChild(col);
  });
}

function renderAchievements(){
  const list = document.getElementById("achievementsList");
  list.innerHTML = "";
  // Sort by year desc
  const items = [...DATA.achievements].sort((a,b)=>b.year - a.year);
  items.forEach((a, i) => {
    const div = document.createElement("div");
    div.className = "tl-item";
    div.innerHTML = `
      <div class="card p-3">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="fw-bold text-navy mb-0">${a.title}</h5>
          <span class="badge text-bg-warning text-dark fw-bold">${a.year}</span>
        </div>
        <p class="mb-2 mt-2">${a.desc || ""}</p>
        ${a.photo ? `<img src="${a.photo}" class="w-100 rounded-2xl" alt="Achievement photo: ${a.title}" loading="lazy">` : ""}
      </div>`;
    list.appendChild(div);
  });
}

function renderAdminLists(){
  // Upcoming list
  const up = document.getElementById("adminUpcomingList");
  up.innerHTML = "";
  DATA.events.upcoming.forEach((e,i)=>{
    const item = document.createElement("div");
    item.className = "list-group-item d-flex justify-content-between align-items-start";
    item.innerHTML = `
      <div class="me-2">
        <div class="fw-bold">${e.name}</div>
        <div class="text-secondary">${e.date} · ${e.time} · ${e.location}</div>
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-secondary" data-ev-edit="${i}">Edit</button>
        <button class="btn btn-outline-danger" data-ev-del="${i}">Delete</button>
      </div>`;
    up.appendChild(item);
  });

  // Past list
  const past = document.getElementById("adminPastList");
  past.innerHTML = "";
  DATA.events.past.forEach((p,i)=>{
    const item = document.createElement("div");
    item.className = "list-group-item d-flex justify-content-between align-items-start";
    item.innerHTML = `
      <div class="me-2">
        <div class="fw-bold">${p.title}</div>
        <div class="text-secondary small">${p.desc}</div>
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-danger" data-past-del="${i}">Delete</button>
      </div>`;
    past.appendChild(item);
  });

  // Gallery admin thumbs
  const gal = document.getElementById("adminGalleryList");
  gal.innerHTML = "";
  DATA.gallery.forEach((g,i)=>{
    const col = document.createElement("div");
    col.className = "col-6";
    col.innerHTML = `
      <div class="position-relative">
        <img src="${g}" class="w-100 rounded" alt="Gallery image ${i+1}">
        <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1" data-gal-del="${i}" aria-label="Remove image"><i class="bi bi-x-lg"></i></button>
      </div>`;
    gal.appendChild(col);
  });

  // Team list
  const tl = document.getElementById("adminTeamList");
  tl.innerHTML = "";
  DATA.team.forEach((t,i)=>{
    const item = document.createElement("div");
    item.className = "list-group-item d-flex justify-content-between align-items-start";
    item.innerHTML = `
      <div class="me-2">
        <div class="fw-bold">${t.name}</div>
        <div class="text-secondary small">${t.role}</div>
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-secondary" data-team-edit="${i}">Edit</button>
        <button class="btn btn-outline-danger" data-team-del="${i}">Delete</button>
      </div>`;
    tl.appendChild(item);
  });

  // Ach list
  const al = document.getElementById("adminAchList");
  al.innerHTML = "";
  DATA.achievements.forEach((a,i)=>{
    const item = document.createElement("div");
    item.className = "list-group-item d-flex justify-content-between align-items-start";
    item.innerHTML = `
      <div class="me-2">
        <div class="fw-bold">${a.year} — ${a.title}</div>
        <div class="text-secondary small">${a.desc || ""}</div>
      </div>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-danger" data-ach-del="${i}">Delete</button>
      </div>`;
    al.appendChild(item);
  });
}

async function renderAll(){
  DATA = await loadData();
  renderHome();
  renderAdvisor();
  renderAbout();
  renderEvents();
  renderGallery();
  renderTeam();
  renderAchievements();
  renderAdminLists();
}

// ===========================
// Swiper Init
// ===========================
const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  a11y: { enabled: true }
});

// ===========================
// Admin Auth (demo)
// ===========================
const ADMIN_KEY = "sportsclub_admin";
function isLoggedIn(){ return localStorage.getItem(ADMIN_KEY) === "true"; }
function setLoggedIn(v){ localStorage.setItem(ADMIN_KEY, v ? "true" : "false"); }

function updateAdminUI(){
  const login = document.getElementById("adminLogin");
  const panel = document.getElementById("adminPanel");
  if(isLoggedIn()){
    login.hidden = true;
    panel.hidden = false;
    // Prefill forms with current data
    document.getElementById("formMotto").value = DATA.motto;
    document.getElementById("formIntro").value = DATA.intro;
    document.getElementById("formVision").value = DATA.vision;
    document.getElementById("formMission").value = DATA.mission;

    document.getElementById("formHistory").value = DATA.about.history;
    document.getElementById("formObjectives").value = DATA.about.objectives;
    document.getElementById("formValues").value = DATA.about.values;

    document.getElementById("advisorFormName").value = DATA.advisor.name;
    document.getElementById("advisorFormTitle").value = DATA.advisor.title;
    document.getElementById("advisorFormMsg").value = DATA.advisor.message;
    document.getElementById("advisorFormPhoto").value = DATA.advisor.photo;

  }else{
    login.hidden = false;
    panel.hidden = true;
  }
}

// Login handler
document.getElementById("loginForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  if(u === "admin" && p === "club@2025"){
    setLoggedIn(true);
    updateAdminUI();
    window.location.hash = "#admin";
  } else {
    alert("Invalid credentials (demo: admin / club@2025)");
  }
});

document.getElementById("btnLogout").addEventListener("click", ()=>{
  setLoggedIn(false);
  updateAdminUI();
});

// Export JSON
document.getElementById("btnExport").addEventListener("click", ()=>{
  const blob = new Blob([JSON.stringify(DATA, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "sportsclub-data.json";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});

// ===========================
// Admin Forms: Save handlers
// ===========================
document.getElementById("formHome").addEventListener("submit", async (e)=>{
  e.preventDefault();
  DATA.motto = document.getElementById("formMotto").value.trim();
  DATA.intro = document.getElementById("formIntro").value.trim();
  DATA.vision = document.getElementById("formVision").value.trim();
  DATA.mission = document.getElementById("formMission").value.trim();
  await saveData(DATA); renderHome();
  alert("Home content saved.");
});

// Reset defaults for home
document.querySelector("#formHome [data-action='reset']").addEventListener("click", async ()=>{
  await resetData();
  updateAdminUI();
  alert("Data reset to defaults.");
});

document.getElementById("formAbout").addEventListener("submit", async (e)=>{
  e.preventDefault();
  DATA.about.history = document.getElementById("formHistory").value.trim();
  DATA.about.objectives = document.getElementById("formObjectives").value.trim();
  DATA.about.values = document.getElementById("formValues").value.trim();
  await saveData(DATA); renderAbout();
  alert("About content saved.");
});

document.getElementById("formAdvisor").addEventListener("submit", async (e)=>{
  e.preventDefault();
  DATA.advisor.name = document.getElementById("advisorFormName").value.trim();
  DATA.advisor.title = document.getElementById("advisorFormTitle").value.trim();
  DATA.advisor.message = document.getElementById("advisorFormMsg").value.trim();
  DATA.advisor.photo = document.getElementById("advisorFormPhoto").value.trim();
  await saveData(DATA); renderAdvisor();
  alert("Advisor content saved.");
});

// Events: Upcoming add/edit
document.getElementById("formEvent").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const idx = parseInt(document.getElementById("eventIndex").value, 10);
  const ev = {
    name: document.getElementById("eventName").value.trim(),
    date: document.getElementById("eventDate").value,
    time: document.getElementById("eventTime").value,
    location: document.getElementById("eventLocation").value.trim(),
    register: document.getElementById("eventRegister").value.trim()
  };
  if(idx >= 0){
    DATA.events.upcoming[idx] = ev;
  } else {
    DATA.events.upcoming.push(ev);
  }
  await saveData(DATA); renderEvents(); renderAdminLists();
  document.getElementById("formEvent").reset();
  document.getElementById("eventIndex").value = -1;
  alert("Upcoming event saved.");
});
document.getElementById("eventClear").addEventListener("click", ()=>{
  document.getElementById("formEvent").reset();
  document.getElementById("eventIndex").value = -1;
});

// Upcoming edit/delete buttons (event delegation)
document.getElementById("adminUpcomingList").addEventListener("click", async (e)=>{
  const editIdx = e.target.closest("[data-ev-edit]")?.getAttribute("data-ev-edit");
  const delIdx = e.target.closest("[data-ev-del]")?.getAttribute("data-ev-del");
  if(editIdx !== null && editIdx !== undefined){
    const ev = DATA.events.upcoming[Number(editIdx)];
    document.getElementById("eventIndex").value = editIdx;
    document.getElementById("eventName").value = ev.name;
    document.getElementById("eventDate").value = ev.date;
    document.getElementById("eventTime").value = ev.time;
    document.getElementById("eventLocation").value = ev.location;
    document.getElementById("eventRegister").value = ev.register || "";
    window.scrollTo({ top: document.getElementById("pane-events").offsetTop - 90, behavior: "smooth" });
  }
  if(delIdx !== null && delIdx !== undefined){
    if(confirm("Delete this upcoming event?")){
      DATA.events.upcoming.splice(Number(delIdx),1);
      await saveData(DATA); renderEvents(); renderAdminLists();
    }
  }
});

// Past events add/delete
document.getElementById("formPastEvent").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const pe = {
    title: document.getElementById("pastTitle").value.trim(),
    desc: document.getElementById("pastDesc").value.trim(),
    album: document.getElementById("pastAlbum").value.trim()
  };
  DATA.events.past.push(pe);
  await saveData(DATA); renderEvents(); renderAdminLists();
  e.target.reset();
  alert("Past event added.");
});
document.getElementById("adminPastList").addEventListener("click", async (e)=>{
  const delIdx = e.target.closest("[data-past-del]")?.getAttribute("data-past-del");
  if(delIdx !== null && delIdx !== undefined){
    if(confirm("Delete this past event?")){
      DATA.events.past.splice(Number(delIdx),1);
      await saveData(DATA); renderEvents(); renderAdminLists();
    }
  }
});

// Gallery upload
const fileInput = document.getElementById("galleryFile");
const preview = document.getElementById("galleryPreview");
fileInput.addEventListener("change", ()=>{
  const f = fileInput.files?.[0];
  if(!f) { preview.classList.add("d-none"); return; }
  const reader = new FileReader();
  reader.onload = (ev)=> {
    preview.src = ev.target.result;
    preview.classList.remove("d-none");
  };
  reader.readAsDataURL(f);
});
document.getElementById("formGallery").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const src = preview.src;
  if(!src){ alert("Please choose an image first."); return; }
  DATA.gallery.unshift(src);
  await saveData(DATA); renderGallery(); renderAdminLists();
  fileInput.value = ""; preview.src = ""; preview.classList.add("d-none");
  alert("Image added to gallery.");
});
document.getElementById("adminGalleryList").addEventListener("click", async (e)=>{
  const delIdx = e.target.closest("[data-gal-del]")?.getAttribute("data-gal-del");
  if(delIdx !== null && delIdx !== undefined){
    if(confirm("Remove this image?")){
      DATA.gallery.splice(Number(delIdx),1);
      await saveData(DATA); renderGallery(); renderAdminLists();
    }
  }
});

// Team add/edit/delete
document.getElementById("formTeam").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const idx = parseInt(document.getElementById("teamIndex").value, 10);
  const m = {
    name: document.getElementById("teamName").value.trim(),
    role: document.getElementById("teamRole").value.trim(),
    bio: document.getElementById("teamBio").value.trim(),
    photo: document.getElementById("teamPhoto").value.trim()
  };
  if(idx >= 0){ DATA.team[idx] = m; }
  else { DATA.team.push(m); }
  await saveData(DATA); renderTeam(); renderAdminLists();
  e.target.reset();
  document.getElementById("teamIndex").value = -1;
  alert("Team member saved.");
});
document.getElementById("teamClear").addEventListener("click", (e)=>{
  const form = document.getElementById("formTeam");
  form.reset(); document.getElementById("teamIndex").value = -1;
});
document.getElementById("adminTeamList").addEventListener("click", async (e)=>{
  const editIdx = e.target.closest("[data-team-edit]")?.getAttribute("data-team-edit");
  const delIdx = e.target.closest("[data-team-del]")?.getAttribute("data-team-del");
  if(editIdx !== null && editIdx !== undefined){
    const t = DATA.team[Number(editIdx)];
    document.getElementById("teamIndex").value = editIdx;
    document.getElementById("teamName").value = t.name;
    document.getElementById("teamRole").value = t.role;
    document.getElementById("teamBio").value = t.bio || "";
    document.getElementById("teamPhoto").value = t.photo || "";
    window.scrollTo({ top: document.getElementById("pane-team").offsetTop - 90, behavior: "smooth" });
  }
  if(delIdx !== null && delIdx !== undefined){
    if(confirm("Delete this team member?")){
      DATA.team.splice(Number(delIdx),1);
      await saveData(DATA); renderTeam(); renderAdminLists();
    }
  }
});

// Achievements add/delete
document.getElementById("formAch").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const a = {
    year: Number(document.getElementById("achYear").value),
    title: document.getElementById("achTitle").value.trim(),
    desc: document.getElementById("achDesc").value.trim(),
    photo: document.getElementById("achPhoto").value.trim()
  };
  DATA.achievements.push(a);
  await saveData(DATA); renderAchievements(); renderAdminLists();
  e.target.reset();
  alert("Achievement added.");
});
document.getElementById("adminAchList").addEventListener("click", async (e)=>{
  const delIdx = e.target.closest("[data-ach-del]")?.getAttribute("data-ach-del");
  if(delIdx !== null && delIdx !== undefined){
    if(confirm("Delete this achievement?")){
      DATA.achievements.splice(Number(delIdx),1);
      await saveData(DATA); renderAchievements(); renderAdminLists();
    }
  }
});

// ===========================
// Initialize on load
// ===========================
document.addEventListener("DOMContentLoaded", async ()=>{
  await renderAll();
  updateAdminUI();

  // Activate correct nav link on scroll (basic)
  const sections = ["home","about","events","gallery","team","achievements","contact","admin"].map(id => document.getElementById(id));
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const onScroll = () => {
    const pos = window.scrollY + 110;
    let current = "home";
    sections.forEach(sec=>{
      if(sec && sec.offsetTop <= pos) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});