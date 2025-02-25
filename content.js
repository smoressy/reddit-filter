const DEFAULT_KEYWORDS=["doge","dogecoin","elon","musk","elon musk","grok","politics","political","trump","maga","politician","political scandal","political controversy","government","federal government","US government","administration","bureaucracy","government takeover","government efficiency","cost-cutting","budget cuts","federal layoffs","mass firings","administrative layoffs","political purge","political shakeup","political corruption","government fraud","donald trump","president trump","trump admin","trump 2024","trump administration","trump conspiracy","trump scandal","trump derangement","musk 2024","musk takeover","musk derangement","elon takeover","tesla mogul","spaceX","musk admin","doge meme","to the moon","D.O.G.E","department of government efficiency","grok AI","chatgpt vs grok","grok censorship","r/the_donald","r/politics","r/WhitePeopleTwitter","neo-nazi","far-right","alt-right","political extremist","white supremacist","efficiency commission","government audit","Trump coup","political takeover","government purge","dismantle bureaucracy","deep state","cronyism","conflict of interest","political lawsuit"];
function shouldHidePost(e){return DEFAULT_KEYWORDS.some(k=>e.textContent.toLowerCase().includes(k));}
function filterPosts(){document.querySelectorAll("shreddit-post, div[data-testid='post-container']").forEach(post=>{let t=post.querySelector("[slot='title'], a[data-testid='post-title'], h1, h3");if(t&&shouldHidePost(t))post.classList.add("reddit-filter-hidden")})}
let lastRun=0;
function throttledFilter(){let now=performance.now();if(now-lastRun>50){filterPosts();lastRun=now}}
function initObservers(){let m=document.querySelector("main")||document.body;new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))throttledFilter()}).observe(m);new MutationObserver(throttledFilter).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",()=>{filterPosts();initObservers()})}else{filterPosts();initObservers()}