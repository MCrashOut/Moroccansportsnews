// ===== CORE (GLOBAL STATE + INIT) =====

let currentUser = null;
let currentArticleId = null;

let articleReactionsUnsub = null;
let articleCommentsUnsub = null;

const ADMIN_EMAIL = "rabiimodz@gmail.com";

function isAdmin(user) {
  return user && user.email === ADMIN_EMAIL;
}

// Firebase init (keep your config here)
const firebaseConfig = {
  // ⚠️ keep your existing config here
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  currentUser = user;
});