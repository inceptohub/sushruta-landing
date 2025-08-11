import { pgTable, text, boolean, timestamp, uuid, integer, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const participants = pgTable("participants", {
  participantId: text("participant_id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  specialty: text("specialty"),
  yearsPractice: text("years_practice"),
  region: text("region"),
  consent: boolean("consent").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable(
  "sessions",
  {
    sessionId: uuid("session_id").primaryKey(),
    participantId: text("participant_id").notNull().references(() => participants.participantId, { onDelete: "cascade" }),
    appVersion: text("app_version"),
    questionSetVersion: integer("question_set_version"),
    randomSeed: integer("random_seed"),
    ua: text("ua"),
    referer: text("referer"),
    ip: text("ip"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
  },
  (tbl) => ({
    byParticipant: index("idx_sessions_participant").on(tbl.participantId),
  }),
);

export const questions = pgTable("questions", {
  questionId: text("question_id").primaryKey(),
  promptText: text("prompt_text").notNull(),
  optionAText: text("optionA_text"),
  optionBText: text("optionB_text"),
  sourceAId: text("sourceA_id"),
  sourceBId: text("sourceB_id"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const responses = pgTable(
  "responses",
  {
    responseId: text("response_id").primaryKey(),
    sessionId: uuid("session_id").notNull().references(() => sessions.sessionId, { onDelete: "cascade" }),
    participantId: text("participant_id").notNull().references(() => participants.participantId, { onDelete: "cascade" }),
    questionId: text("question_id").notNull().references(() => questions.questionId, { onDelete: "cascade" }),
    shownOrder: text("shown_order"),
    choice: text("choice"), // allowed: 'A','B','tie','neither'
    feedbackText: text("feedback_text"),
    timeStarted: timestamp("time_started", { withTimezone: true }),
    timeSpentMs: integer("time_spent_ms"),
    sourceAIdAtEval: text("sourceA_id_at_eval"),
    sourceBIdAtEval: text("sourceB_id_at_eval"),
    optionATextHash: text("optionA_text_hash"),
    optionBTextHash: text("optionB_text_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (tbl) => ({
    bySession: index("idx_responses_session").on(tbl.sessionId),
    byParticipant: index("idx_responses_participant").on(tbl.participantId),
    uniqSessionQuestion: uniqueIndex("unq_responses_session_question").on(tbl.sessionId, tbl.questionId),
  }),
);

// Optional: CHECK constraint for choice; Drizzle currently does not expose check builder universally
export const choiceConstraint = sql`alter table "responses" add constraint if not exists "chk_choice" check (choice in ('A','B','tie','neither'))`;
