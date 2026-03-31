// ===== ARTICLE SYSTEM =====

function currentArticleReactionDocKey() {
  return `article_${currentArticleId}`;
}

// ===== REACTIONS =====
function reactToArticle(type) {
  if (!currentUser) {
    alert("Login required");
    return;
  }

  const ref = db.collection("reactions").doc(currentArticleReactionDocKey());

  db.runTransaction(async (t) => {
    const doc = await t.get(ref);
    let data = doc.exists ? doc.data() : { likes: 0, love: 0, fire: 0 };

    data[type] = (data[type] || 0) + 1;

    t.set(ref, data);
  }).catch(err => console.error(err));
}

// ===== COMMENTS =====
function postArticleComment() {
  const text = document.getElementById("article-comment-input").value.trim();
  if (!text || !currentUser) return;

  db.collection("posts").add({
    kind: "article_comment",
    articleId: currentArticleId,
    text,
    userId: currentUser.uid,
    authorName: currentUser.email,
    createdAt: Date.now()
  });

  document.getElementById("article-comment-input").value = "";
}

// ===== LOAD COMMENTS =====
function loadArticleComments() {
  if (articleCommentsUnsub) articleCommentsUnsub();

  articleCommentsUnsub = db.collection("posts")
    .where("articleId", "==", currentArticleId)
    .onSnapshot(snapshot => {
      renderArticleComments(snapshot);
    });
}

// ===== RENDER COMMENTS =====
function renderArticleComments(snapshot) {
  const list = document.getElementById("article-comments-list");
  list.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    const canDelete =
      currentUser &&
      (data.userId === currentUser.uid || isAdmin(currentUser));

    list.innerHTML += `
      <div class="article-comment-item">
        <div class="article-comment-head">
          <strong>${escapeHtml(data.authorName)}</strong>
          ${canDelete ? `<button onclick="deleteComment('${doc.id}')">Delete</button>` : ""}
        </div>
        <div>${escapeHtml(data.text)}</div>
      </div>
    `;
  });
}

// ===== DELETE =====
function deleteComment(id) {
  if (!confirm("Delete this comment?")) return;

  db.collection("posts").doc(id).delete();
}