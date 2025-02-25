const DEFAULT_KEYWORDS = [
    "doge","dogecoin","elon","musk","elon musk","grok","politics","political","trump","maga",
    "politician","political scandal","political controversy","government","federal government",
    "US government","administration","bureaucracy","government takeover","government efficiency",
    "cost-cutting","budget cuts","federal layoffs","mass firings","administrative layoffs",
    "political purge","political shakeup","political corruption","government fraud","donald trump",
    "president trump","trump admin","trump 2024","trump administration","trump conspiracy",
    "trump scandal","trump derangement","musk 2024","musk takeover","musk derangement","elon takeover",
    "tesla mogul","spaceX","musk admin","doge meme","to the moon","D.O.G.E",
    "department of government efficiency","grok AI","chatgpt vs grok","grok censorship","r/the_donald",
    "r/politics","r/WhitePeopleTwitter","neo-nazi","far-right","alt-right","political extremist",
    "white supremacist","efficiency commission","government audit","Trump coup","political takeover",
    "government purge","dismantle bureaucracy","deep state","cronyism","conflict of interest",
    "political lawsuit"
  ];
  
  function hidePostIfMatch(post) {
    const titleEl = post.querySelector("[slot='title'], a[data-testid='post-title'], h1, h3");
    if (!titleEl) return;
    const text = titleEl.textContent.toLowerCase();
    for (const keyword of DEFAULT_KEYWORDS) {
      if (text.includes(keyword)) {
        post.classList.add("reddit-filter-hidden");
        break;
      }
    }
  }
  
  function processNewNode(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
  
    if (node.matches("shreddit-post, div[data-testid='post-container']")) {
      hidePostIfMatch(node);
    }
  
    const subPosts = node.querySelectorAll?.("shreddit-post, div[data-testid='post-container']");
    subPosts?.forEach(hidePostIfMatch);
  }
  
  function initObserver() {
    new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          processNewNode(addedNode);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  
  (function() {
    if (document.body) {
      document.querySelectorAll("shreddit-post, div[data-testid='post-container']").forEach(hidePostIfMatch);
      initObserver();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("shreddit-post, div[data-testid='post-container']").forEach(hidePostIfMatch);
        initObserver();
      });
    }
  })();  