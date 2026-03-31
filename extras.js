// ===== EXTRA FEATURES =====

// SAVE ARTICLE
function saveArticle() {
  if (!currentUser) return alert("Login required");

  db.collection("saved")
    .doc(currentUser.uid)
    .collection("items")
    .doc(currentArticleId)
    .set({
      articleId: currentArticleId,
      savedAt: Date.now()
    });
}