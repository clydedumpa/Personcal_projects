"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDeferredValue, useEffect, useRef, useState, useTransition } from "react";

import type { ProfileSiteModel } from "@/content/profile";

import styles from "./portfolio-showcase.module.css";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const initialGreeting =
  "Hi, I'm Clyde's digital twin. Ask me about consulting work, production support, Microsoft 365 migrations, or how he works with customers.";

export function PortfolioShowcase({
  profile,
}: {
  profile: ProfileSiteModel;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    profile.categories[0]?.id ?? "",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: initialGreeting },
  ]);
  const deferredMessages = useDeferredValue(messages);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  const activeCategory =
    profile.categories.find((category) => category.id === activeCategoryId) ??
    profile.categories[0];

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [deferredMessages]);

  function sendMessage(rawMessage: string) {
    const trimmed = rawMessage.trim();

    if (!trimmed || isPending) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setDraft("");
    setError("");
    setMessages(nextMessages);

    startTransition(async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: nextMessages,
          }),
        });

        const payload = (await response.json()) as {
          error?: string;
          reply?: string;
        };

        if (!response.ok || !payload.reply) {
          throw new Error(payload.error ?? "Unable to reach the digital twin.");
        }

        setMessages((currentMessages) => [
          ...currentMessages,
          { role: "assistant", content: payload.reply ?? "" },
        ]);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "The digital twin is temporarily unavailable.",
        );
      }
    });
  }

  return (
    <main className={styles.page}>
      <div className={styles.pageTexture} aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className={`${styles.orb} ${styles.orbGold}`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        aria-hidden="true"
        className={`${styles.orb} ${styles.orbBlue}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ duration: 0.8, delay: 0.12 }}
      />
      <motion.div
        aria-hidden="true"
        className={`${styles.orb} ${styles.orbPurple}`}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <div className={styles.shell}>
        <motion.header
          className={styles.topbar}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.brandLockup}>
            <div className={styles.brandBadge}>CD</div>
            <div>
              <p className={styles.brandTitle}>{profile.name}</p>
              <p className={styles.brandSubtitle}>Technical consultant and systems stabilizer</p>
            </div>
          </div>

          <nav aria-label="Section navigation" className={styles.navLinks}>
            <a href="#operating-modes">Modes</a>
            <a href="#portfolio-work">Portfolio</a>
            <a href="#career-arc">Career</a>
            <a href="#credibility-stack">Credentials</a>
            <a href="#digital-twin">Chat</a>
          </nav>
        </motion.header>

        <section className={styles.hero}>
          <motion.div
            className={styles.heroCard}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.eyebrow}>Technical consultant and operations stabilizer</p>
            <h1 className={styles.heroTitle}>{profile.name}</h1>
            <p className={styles.heroSubtitle}>{profile.title}</p>
            <p className={styles.heroSummary}>{profile.summary}</p>

            <div className={styles.heroMeta}>
              <span className={styles.metaPill}>{profile.location}</span>
              <span className={styles.metaPill}>{profile.contact.email}</span>
              <span className={styles.metaPill}>{profile.contact.phone}</span>
            </div>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryAction}
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Open LinkedIn
              </a>
              <a className={styles.secondaryAction} href="#digital-twin">
                Ask the digital twin
              </a>
            </div>

            <div className={styles.statGrid}>
              {profile.stats.map((stat) => (
                <div className={styles.statCard} key={stat.label}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className={styles.signalCard}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <div className={styles.spotlightHeader}>
              <div className={styles.spotlightAvatar}>CD</div>
              <div>
                <p className={styles.signalTopline}>North star</p>
                <h2 className={styles.signalTitle}>Built for reliable delivery</h2>
              </div>
            </div>

            <p className={styles.signalSummary}>{profile.currentMission}</p>

            <div className={styles.strengthGrid}>
              {profile.signatureStrengths.map((strength) => (
                <div className={styles.strengthChip} key={strength}>
                  {strength}
                </div>
              ))}
            </div>

            <div className={styles.toolbeltBlock}>
              <p className={styles.toolbeltTitle}>Toolbelt</p>
              <div className={styles.toolbeltGrid}>
                {profile.toolbelt.map((tool) => (
                  <span className={styles.toolChip} key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                className={styles.activeLaneCard}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22 }}
              >
                <p className={styles.activeLaneEyebrow}>{activeCategory.eyebrow}</p>
                <h3 className={styles.activeLaneTitle}>{activeCategory.label}</h3>
                <p className={styles.activeLaneSummary}>{activeCategory.detail}</p>

                <div className={styles.signalList}>
                  {activeCategory.bullets.map((bullet) => (
                    <p className={styles.signalItem} key={bullet}>
                      {bullet}
                    </p>
                  ))}
                </div>

                <p className={styles.signalFooter}>{activeCategory.signal}</p>
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </section>

        <section className={styles.section} id="operating-modes">
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Operating modes</h2>
                <p className={styles.sectionIntro}>
                  The page stays simple, but the story is layered. Pick a lane
                  to see how Clyde&apos;s background shifts from delivery to
                  production support to end-user operations.
                </p>
              </div>
            </div>

            <div className={styles.trackGrid}>
              {profile.categories.map((category) => (
                <button
                  key={category.id}
                  aria-pressed={category.id === activeCategory.id}
                  className={`${styles.trackButton} ${
                    category.id === activeCategory.id ? styles.trackButtonActive : ""
                  }`}
                  onClick={() => setActiveCategoryId(category.id)}
                  type="button"
                >
                  <span className={styles.trackEyebrow}>{category.eyebrow}</span>
                  <span className={styles.trackLabel}>{category.label}</span>
                  <span className={styles.trackSummary}>{category.summary}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="career-arc">
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Career arc</h2>
                <p className={styles.sectionIntro}>
                  A support foundation, a teaching layer, and now a consulting
                  role that blends customer trust with technical delivery.
                </p>
              </div>
            </div>

            <div className={styles.journeyGrid}>
              {profile.experience.map((entry) => (
                <article className={styles.journeyCard} key={`${entry.company}-${entry.role}`}>
                  <div>
                    <div className={styles.journeyMeta}>
                      <span className={styles.journeyPill}>{entry.company}</span>
                      <span className={styles.journeyPill}>{entry.dates}</span>
                      <span className={styles.journeyPill}>{entry.location}</span>
                    </div>
                    <h3 className={styles.journeyRole}>{entry.role}</h3>
                    <p className={styles.journeySummary}>{entry.summary}</p>
                    <div className={styles.journeyHighlights}>
                      {entry.highlights.map((highlight) => (
                        <p key={highlight}>{highlight}</p>
                      ))}
                    </div>
                  </div>

                  <button
                    className={styles.cardAction}
                    onClick={() => setActiveCategoryId(entry.categoryId)}
                    type="button"
                  >
                    Focus this lane
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="portfolio-work">
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Portfolio</h2>
                <p className={styles.sectionIntro}>
                  A dedicated lane for featured work. The first card anchors the
                  current site, and the structure is ready for future projects,
                  demos, and case studies as they are published.
                </p>
              </div>
            </div>

            <div className={styles.portfolioGrid}>
              {profile.portfolio.map((entry) => (
                <article className={styles.portfolioCard} key={entry.title}>
                  <div className={styles.portfolioMeta}>
                    <span className={styles.portfolioPill}>{entry.format}</span>
                    <span className={styles.portfolioPill}>{entry.status}</span>
                  </div>
                  <h3 className={styles.portfolioTitle}>{entry.title}</h3>
                  <p className={styles.portfolioSummary}>{entry.summary}</p>
                  <div className={styles.portfolioHighlights}>
                    {entry.highlights.map((highlight) => (
                      <p key={highlight}>{highlight}</p>
                    ))}
                  </div>

                  {entry.href ? (
                    <a
                      className={styles.cardAction}
                      href={entry.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {entry.hrefLabel ?? "Open project"}
                    </a>
                  ) : (
                    <p className={styles.portfolioNote}>
                      Add a live link or repository later by updating the
                      portfolio data.
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="credibility-stack">
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Credibility stack</h2>
                <p className={styles.sectionIntro}>
                  The profile is broad, but the pattern is consistent: service,
                  technical depth, and a strong bias for practical outcomes.
                </p>
              </div>
            </div>

            <div className={styles.credentialsGrid}>
              <article className={styles.credentialCard}>
                <h3 className={styles.credentialTitle}>Certifications</h3>
                <div className={styles.credentialList}>
                  {profile.certifications.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </article>

              <article className={styles.credentialCard}>
                <h3 className={styles.credentialTitle}>Education</h3>
                <div className={styles.credentialList}>
                  {profile.education.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </article>

              <article className={styles.credentialCard}>
                <h3 className={styles.credentialTitle}>Languages</h3>
                <div className={styles.credentialList}>
                  {profile.languages.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} id="digital-twin">
          <div className={styles.chatPanel}>
            <aside className={styles.chatIntro}>
              <p className={styles.eyebrow}>Digital twin</p>
              <h2 className={styles.sectionTitle}>Talk to Clyde&apos;s working style</h2>
              <p className={styles.chatIntroCopy}>
                This chat is tuned to the resume, not generic career advice. It
                is best for questions about consulting style, support depth,
                Microsoft 365 experience, and customer-facing delivery.
              </p>

              <div className={styles.starterList}>
                {profile.starterQuestions.map((question) => (
                  <button
                    className={styles.starterButton}
                    disabled={isPending}
                    key={question}
                    onClick={() => sendMessage(question)}
                    type="button"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className={styles.chatTrustNote}>
                Answers stay tied to the profile and should avoid inventing
                facts that are not supported by the resume.
              </div>
            </aside>

            <div className={styles.chatConsole}>
              <div
                aria-busy={isPending}
                aria-live="polite"
                className={styles.transcript}
                role="log"
              >
                <div className={styles.messageStack}>
                  {deferredMessages.map((message, index) => (
                    <div
                      className={`${styles.message} ${
                        message.role === "assistant"
                          ? styles.assistantMessage
                          : styles.userMessage
                      }`}
                      key={`${message.role}-${index}-${message.content.slice(0, 20)}`}
                    >
                      {message.content}
                    </div>
                  ))}
                  {isPending ? (
                    <div className={`${styles.message} ${styles.assistantMessage}`}>
                      Thinking through the profile...
                    </div>
                  ) : null}
                  <div ref={transcriptEndRef} />
                </div>
              </div>

              <form
                className={styles.composer}
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(draft);
                }}
              >
                <label className={styles.helperText} htmlFor="digital-twin-input">
                  Ask about delivery style, technical scope, or support
                  experience.
                </label>
                <textarea
                  className={styles.textarea}
                  id="digital-twin-input"
                  name="digitalTwin"
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="What would you like to know about Clyde?"
                  value={draft}
                />
                <div className={styles.composerFooter}>
                  <p className={`${styles.helperText} ${error ? styles.errorText : ""}`}>
                    {error ||
                      (isPending
                        ? "Thinking through the profile..."
                        : "Responses stay grounded in the resume and may avoid unknown details.")}
                  </p>
                  <button
                    className={styles.submitButton}
                    disabled={isPending || draft.trim().length === 0}
                    type="submit"
                  >
                    {isPending ? "Sending..." : "Send message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
