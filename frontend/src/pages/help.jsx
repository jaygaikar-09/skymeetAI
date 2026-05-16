import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/help.css";

const categories = [
  {
    title: "Getting Started",
    description: "Set up your workspace, create a prompt, and save your first story.",
    icon: "spark",
  },
  {
    title: "AI Story Generation",
    description: "Tune characters, tone, length, genre, and regeneration settings.",
    icon: "wand",
  },
  {
    title: "Account & Login",
    description: "Recover access, update your profile, and manage session settings.",
    icon: "user",
  },
  {
    title: "Subscription & Billing",
    description: "Review plans, invoices, credits, renewals, and payment methods.",
    icon: "card",
  },
  {
    title: "Troubleshooting",
    description: "Fix failed generations, slow responses, exports, and browser issues.",
    icon: "tool",
  },
  {
    title: "Privacy & Data",
    description: "Understand saved stories, data controls, and content privacy.",
    icon: "lock",
  },
  {
    title: "API / Integrations",
    description: "Connect Story Spark AI to creative tools and publishing workflows.",
    icon: "plug",
  },
];

const articles = [
  {
    title: "How to generate your first AI story",
    category: "Getting Started",
    readTime: "4 min read",
    summary: "Learn how prompts, audience, genre, and story length work together.",
    steps: [
      "Choose a genre and audience before writing the prompt.",
      "Describe the main character, setting, conflict, and desired ending style.",
      "Generate a draft, then use rewrite prompts to adjust tone or pacing.",
    ],
  },
  {
    title: "Fixing failed story generation",
    category: "Troubleshooting",
    readTime: "3 min read",
    summary: "Common causes for failed generations and how to retry safely.",
    steps: [
      "Check your connection and refresh the page if the request timed out.",
      "Shorten very long prompts or remove conflicting instructions.",
      "Retry once, then contact support with the prompt and approximate time.",
    ],
  },
  {
    title: "Managing saved stories",
    category: "Getting Started",
    readTime: "5 min read",
    summary: "Organize drafts, favorites, versions, and completed story exports.",
    steps: [
      "Save promising drafts before regenerating alternate versions.",
      "Use titles and folders to group stories by project or audience.",
      "Archive older versions once the final story is exported.",
    ],
  },
  {
    title: "Understanding AI credits/usage",
    category: "Subscription & Billing",
    readTime: "4 min read",
    summary: "See how credits are counted and what affects story generation cost.",
    steps: [
      "Credits are used when Story Spark AI creates or rewrites story content.",
      "Longer stories and multiple variations may use more credits.",
      "Review your usage before generating large batches of drafts.",
    ],
  },
  {
    title: "Exporting or sharing stories",
    category: "AI Story Generation",
    readTime: "2 min read",
    summary: "Prepare stories for PDF, classroom sharing, or publishing workflows.",
    steps: [
      "Open the saved story and review formatting before export.",
      "Choose the format that matches your use case, such as PDF or share link.",
      "Check privacy settings before sharing a story outside your workspace.",
    ],
  },
  {
    title: "Resetting your password",
    category: "Account & Login",
    readTime: "2 min read",
    summary: "Recover account access and get back into your story workspace.",
    steps: [
      "Open the login page and choose the password reset option.",
      "Use the reset link from your account email within its expiration window.",
      "Sign in again and update saved credentials on your device.",
    ],
  },
  {
    title: "Reviewing privacy controls",
    category: "Privacy & Data",
    readTime: "3 min read",
    summary: "Understand how saved drafts, exports, and shared links are handled.",
    steps: [
      "Review who can access each saved story before sharing it.",
      "Remove public links when a story should return to private draft status.",
      "Avoid placing sensitive personal information in prompts or story notes.",
    ],
  },
  {
    title: "Connecting an integration",
    category: "API / Integrations",
    readTime: "5 min read",
    summary: "Plan how Story Spark AI can connect with publishing or classroom tools.",
    steps: [
      "Create an integration key from your workspace settings when available.",
      "Use a test project before sending production story content.",
      "Rotate keys if an integration is no longer used by your team.",
    ],
  },
];

const faqs = [
  {
    question: "How do I get better story results?",
    answer:
      "Start with a clear premise, audience, genre, and emotional tone. Add character goals or constraints if you want the story to follow a specific arc.",
  },
  {
    question: "Why did my story generation fail?",
    answer:
      "A generation can fail because of a temporary service issue, a network timeout, or a prompt that needs adjustment. Refresh your connection, shorten the prompt, and retry.",
  },
  {
    question: "Can I edit a story after it is generated?",
    answer:
      "Yes. Saved stories are designed for iteration, so you can revise sections, regenerate alternate versions, and keep the version that fits best.",
  },
  {
    question: "How are AI credits used?",
    answer:
      "Credits are typically based on generation length and the amount of AI work requested. Longer stories, rewrites, and multiple variations may use more credits.",
  },
  {
    question: "Is my story content private?",
    answer:
      "Story content should be treated as private to your account unless you choose to export or share it. Review the Privacy & Data section for workspace-specific controls.",
  },
];

function HelpIcon({ type }) {
  const common = {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (type) {
    case "wand":
      return (
        <svg {...common}>
          <path d="M15 4l5 5" />
          <path d="M14 5l-9 9a2 2 0 0 0 0 3l2 2a2 2 0 0 0 3 0l9-9" />
          <path d="M5 4v3M3.5 5.5h3M19 17v3M17.5 18.5h3" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="8" r="4" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      );
    case "tool":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-5.6 5.6a2 2 0 1 0 3 3l5.6-5.6a4 4 0 0 0 5.4-5.4l-3 3-3-3 3-3z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "plug":
      return (
        <svg {...common}>
          <path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0V7z" />
          <path d="M12 16v5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
          <path d="M19 16l.8 2.7L22 19.5l-2.2.8L19 23l-.8-2.7-2.2-.8 2.2-.8L19 16z" />
        </svg>
      );
  }
}

function BrandMark() {
  return (
    <div className="hc-brand-mark" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19V6.5A2.5 2.5 0 0 1 6.5 4H20v13H7a3 3 0 0 0-3 3z"
          stroke="#38bdf8"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8h7M8 12h5"
          stroke="#fbbf24"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`hc-faq-item ${isOpen ? "hc-faq-open" : ""}`}>
      <button
        className="hc-faq-question"
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{item.question}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="hc-faq-answer" role="region">
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function HelpCenter() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [activeArticle, setActiveArticle] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const selectedArticle = articles.find((article) => article.title === activeArticle);

  const filteredArticles = useMemo(() => {
    const value = query.trim().toLowerCase();
    let results = articles;

    if (activeCategory) {
      results = results.filter((article) => article.category === activeCategory);
    }

    if (!value) return results;

    return results.filter((article) =>
      [article.title, article.category, article.summary, ...(article.steps || [])]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [query, activeCategory]);

  useEffect(() => {
    if (!activeArticle) return;

    const scrollTimer = window.setTimeout(() => {
      document.getElementById("active-guide-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return () => window.clearTimeout(scrollTimer);
  }, [activeArticle]);

  function getArticleId(title) {
    return `article-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  }

  function openArticle(title) {
    setActiveArticle(title);
  }

  function openCategory(title) {
    setActiveCategory(title);
    setQuery("");
    setActiveArticle("");
    document.getElementById("articles-title")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="hc-root">
      <div className="hc-bg" aria-hidden />

      <header className="hc-nav" role="navigation" aria-label="Help Center navigation">
        <button className="hc-brand" type="button" onClick={() => navigate("/")}>
          <BrandMark />
          <span>Story Spark AI</span>
        </button>
        <div className="hc-nav-actions">
          <button className="hc-nav-link" type="button" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="hc-nav-cta" type="button" onClick={() => navigate("/auth")}>
            Start Creating
          </button>
        </div>
      </header>

      <main className="hc-main">
        <section className="hc-hero" aria-labelledby="help-title">
          <div className="hc-badge">
            <span className="hc-badge-dot" aria-hidden />
            <span>Support for creators</span>
          </div>
          <h1 id="help-title">Help Center</h1>
          <p>
            Find quick answers, learn how to shape better AI stories, troubleshoot issues,
            and get back to creating with Story Spark AI.
          </p>
          <form className="hc-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <label className="hc-sr-only" htmlFor="help-search">
              Search help articles
            </label>
            <input
              id="help-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles, billing, credits, exports..."
            />
          </form>
          {query.trim() && (
            <div className="hc-search-results" aria-live="polite">
              <div className="hc-search-results-head">
                <span>
                  {filteredArticles.length} result{filteredArticles.length === 1 ? "" : "s"} for "{query.trim()}"
                </span>
              </div>
              {filteredArticles.length > 0 ? (
                <div className="hc-search-result-list">
                  {filteredArticles.map((article) => (
                    <button
                      className="hc-search-result"
                      key={article.title}
                      type="button"
                      onClick={() => openArticle(article.title)}
                    >
                      <div>
                        <span>{article.category}</span>
                        <h2>{article.title}</h2>
                        <p>{article.summary}</p>
                      </div>
                      <small>{article.readTime}</small>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="hc-search-empty">
                  <h2>No matching articles</h2>
                  <p>Try searching for generation, exports, login, billing, or privacy.</p>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="hc-section" aria-labelledby="categories-title">
          <div className="hc-section-heading">
            <span>Browse topics</span>
            <h2 id="categories-title">Quick Help Categories</h2>
          </div>
          <div className="hc-category-grid">
            {categories.map((category) => (
              <button
                className={`hc-category-card ${activeCategory === category.title ? "hc-category-active" : ""}`}
                key={category.title}
                type="button"
                onClick={() => openCategory(category.title)}
                aria-pressed={activeCategory === category.title}
              >
                <div className="hc-category-icon">
                  <HelpIcon type={category.icon} />
                </div>
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="hc-section hc-two-column" aria-labelledby="articles-title">
          <div className="hc-section-heading">
            <span>Most viewed</span>
            <div className="hc-article-heading-row">
              <h2 id="articles-title">
                {activeCategory ? `${activeCategory} Articles` : "Popular Help Articles"}
              </h2>
              {activeCategory && (
                <button
                  className="hc-clear-filter"
                  type="button"
                  onClick={() => {
                    setActiveCategory("");
                    setActiveArticle("");
                  }}
                >
                  Show all
                </button>
              )}
            </div>
          </div>
          <div className="hc-article-list" aria-live="polite">
            {filteredArticles.map((article) => (
              <button
                className={`hc-article-card ${activeArticle === article.title ? "hc-article-active" : ""}`}
                id={getArticleId(article.title)}
                key={article.title}
                type="button"
                aria-expanded={activeArticle === article.title}
                onClick={() => openArticle(article.title)}
              >
                <div className="hc-article-kicker">{article.category}</div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="hc-article-meta">
                  <span>{article.readTime}</span>
                  <span aria-hidden>Read guide</span>
                </div>
              </button>
            ))}
            {filteredArticles.length === 0 && (
              <div className="hc-empty-state">
                <h3>No matching articles yet</h3>
                <p>Try a broader search term or contact support for help with this topic.</p>
              </div>
            )}
          </div>
          {selectedArticle && (
            <article
              className="hc-guide-panel"
              id="active-guide-panel"
              aria-labelledby="guide-title"
              tabIndex="-1"
            >
              <div className="hc-guide-panel-top">
                <div>
                  <span>{selectedArticle.category}</span>
                  <h2 id="guide-title">{selectedArticle.title}</h2>
                </div>
                <button
                  className="hc-guide-close"
                  type="button"
                  onClick={() => setActiveArticle("")}
                  aria-label="Close guide"
                >
                  ×
                </button>
              </div>
              <p>{selectedArticle.summary}</p>
              <ol>
                {selectedArticle.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          )}
        </section>

        <section className="hc-section hc-support-layout" aria-labelledby="faq-title">
          <div>
            <div className="hc-section-heading">
              <span>Fast answers</span>
              <h2 id="faq-title">FAQ</h2>
            </div>
            <div className="hc-faq-list">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  item={faq}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>

          <aside className="hc-contact-card" aria-labelledby="contact-title">
            <div className="hc-contact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 5h16v12H7l-3 3V5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <h2 id="contact-title">Contact Support</h2>
            <p>Story Spark AI is open source. Visit the repository to review code, report issues, or contribute improvements.</p>
            <div className="hc-contact-links">
              <a href="https://github.com/ronisarkarexe/story-spark-ai" target="_blank" rel="noreferrer">
                GitHub: ronisarkarexe/story-spark-ai
              </a>
            </div>
            <div className="hc-response-time">
              <span className="hc-response-dot" aria-hidden />
              Open source project on GitHub
            </div>
          </aside>
        </section>

        <section className="hc-footer-cta" aria-labelledby="cta-title">
          <div>
            <span>Ready when you are</span>
            <h2 id="cta-title">Continue creating your next story.</h2>
            <p>Return to Story Spark AI and turn your next idea into a polished draft.</p>
          </div>
          <button className="hc-cta-button" type="button" onClick={() => navigate("/auth")}>
            Create a story
          </button>
        </section>
      </main>
    </div>
  );
}
