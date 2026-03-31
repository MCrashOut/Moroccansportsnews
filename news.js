// ===== NEWS =====

// We removed broken RSS proxies
// News now opens Google News searches

function openNews(query) {
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws`, "_blank");
}