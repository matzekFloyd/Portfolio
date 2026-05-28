import { FormEvent, useId, useState } from "react";

import styles from "@web/styles/contact.module.scss";

type FormStatus = "idle" | "sending" | "sent" | "error";

function submitButtonLabel(status: FormStatus) {
  if (status === "sending") return "Sending…";
  if (status === "sent") return "Send another message";
  return "Send message";
}

export default function ContactForm() {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const isFormLocked = status === "sending" || status === "sent";

  function handleComposeAgain() {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isFormLocked) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-name`}>
            Name
          </label>
          <input
            id={`${formId}-name`}
            className={styles.input}
            type="text"
            name="name"
            autoComplete="name"
            required
            disabled={isFormLocked}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-email`}>
            Email
          </label>
          <input
            id={`${formId}-email`}
            className={styles.input}
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={isFormLocked}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${formId}-subject`}>
          Subject
        </label>
        <input
          id={`${formId}-subject`}
          className={styles.input}
          type="text"
          name="subject"
          required
          disabled={isFormLocked}
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${formId}-message`}>
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          className={styles.textarea}
          name="message"
          rows={6}
          required
          disabled={isFormLocked}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <div className={styles.actions}>
        {status === "sent" ? (
          <p className={styles.feedback} role="status">
            Thanks — your message was sent.
          </p>
        ) : null}

        {status === "error" ? (
          <p className={`${styles.feedback} ${styles.feedbackError}`} role="alert">
            Something went wrong. Please try again.
          </p>
        ) : null}

        <button
          className={`${styles.submit} ${status === "sent" ? styles.submitSecondary : ""}`}
          type={status === "sent" ? "button" : "submit"}
          disabled={status === "sending"}
          onClick={status === "sent" ? handleComposeAgain : undefined}
        >
          {submitButtonLabel(status)}
        </button>
      </div>
    </form>
  );
}
