/// <reference types="node" />

import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAnswerRecords,
  buildQuestionOrder,
  clampIndex,
  formatSeconds,
  getQuizDurationSeconds,
  getQuizScore,
  getQuizScorePercent,
  getRestoredQuestionOrder,
  isPassingScore,
} from "./quiz-engine";

const questions = [
  {
    id: "q1",
    prompt: "Question 1",
    answerId: "a",
    explanation: "Explanation 1",
    choices: [
      { id: "a", label: "Correct 1" },
      { id: "b", label: "Wrong 1" },
    ],
  },
  {
    id: "q2",
    prompt: "Question 2",
    answerId: "c",
    explanation: "Explanation 2",
    choices: [
      { id: "c", label: "Correct 2" },
      { id: "d", label: "Wrong 2" },
    ],
  },
  {
    id: "q3",
    prompt: "Question 3",
    answerId: "e",
    explanation: "Explanation 3",
    choices: [
      { id: "e", label: "Correct 3" },
      { id: "f", label: "Wrong 3" },
    ],
  },
];

test("buildQuestionOrder preserves source order when randomize is false", () => {
  assert.deepEqual(
    buildQuestionOrder({ questions, randomize: false, limit: undefined }),
    ["q1", "q2", "q3"],
  );
});

test("buildQuestionOrder applies limits after shuffling", () => {
  const order = buildQuestionOrder({
    questions,
    randomize: true,
    limit: 2,
    random: () => 0,
  });

  assert.equal(order.length, 2);
  assert.deepEqual(new Set(order), new Set(["q2", "q3"]));
});

test("getRestoredQuestionOrder ignores stale question ids", () => {
  const order = getRestoredQuestionOrder(
    {
      allowBack: true,
      answersByQuestionId: {},
      autoCheck: false,
      currentIndex: 0,
      questionOrder: ["missing", "q2"],
      remainingSeconds: 30,
      selectedChoiceId: null,
      submitted: false,
      updatedAt: 1,
    },
    ["q1", "q2", "q3"],
    questions,
  );

  assert.deepEqual(order, ["q2"]);
});

test("buildAnswerRecords scores unanswered questions as incorrect", () => {
  const records = buildAnswerRecords(questions, { q1: "a", q2: "d" });

  assert.equal(getQuizScore(records), 1);
  assert.equal(records[2]?.selectedLabel, "No answer selected");
  assert.equal(records[2]?.correct, false);
});

test("quiz pass threshold is 75 percent", () => {
  assert.equal(getQuizScorePercent(15, 20), 75);
  assert.equal(isPassingScore(15, 20), true);
  assert.equal(isPassingScore(14, 20), false);
});

test("duration and time formatting are stable", () => {
  assert.equal(getQuizDurationSeconds({ durationMinutes: 20, estimatedMinutes: "8-10 min" }, 5), 1200);
  assert.equal(getQuizDurationSeconds({ estimatedMinutes: "8-10 min" }, 5), 600);
  assert.equal(formatSeconds(605), "10:05");
  assert.equal(clampIndex(10, 3), 2);
});
