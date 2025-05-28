import { useState, useCallback } from "react";
import "./App.css";

const questions = [
  "I feel restless or on-edge.",
  "I have difficulty concentrating because of worrying thoughs.",
  "I experience shortness of breath or a high heartrate.",
  "I am easily annoyed.",
  "Thoughts keep me awake at night.",
  "I worry about the small things.",
  "I avoid social situations.",
  "I feel a sense of dread.",
  "I experience muscle tightness or aches.",
  "I feel dizzy or lightheaded.",
  "I feel detached from my surroundings.",
  "I experience intense, sudden fear.",
  "I worry what others think of me.",
  "I overthink.",
  "I feel nauseous, or have stomach discomfort in public settings.",
  "I fear of losing control.",
  "I find myself thinking about past mistakes.",
  "I have difficulty making decisions.",
  "I am overwhelmed by my responsibilities.",
  "I experience trembling or shakiness in social settings.",
];

function App() {
  const [score, setScore] = useState(0);
  const [quizLoop, setQuizLoop] = useState("menu");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [scorePercentage, setScorePercentage] = useState(0);

  const beginQuiz = useCallback(() => {
    setScore(0);
    setQuizLoop("quiz");
    setCurrentQuestion(questions[0]);
    setCurrentIndex(0);
  }, [setQuizLoop, setCurrentQuestion, questions]);

  const handleAnswer = useCallback(
    (valueToAdd: number) => {
      setScore(score + valueToAdd);
      setScorePercentage((score / (questions.length * 5)) * 100);
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex < questions.length) {
          setCurrentQuestion(questions[newIndex]);
        } else {
          setQuizLoop("results");
        }
        return newIndex;
      });
    },
    [
      setScore,
      score,
      setCurrentQuestion,
      currentIndex,
      setCurrentIndex,
      setScorePercentage,
    ]
  );

  return (
    <>
      {quizLoop == "menu" && (
        <>
          <h1>Anxiety Quiz</h1>
          <p>Do not use this test as professional evaluation.</p>
          <button onClick={beginQuiz}>Begin</button>
        </>
      )}
      {quizLoop == "quiz" && (
        <>
          <div className="buttonContainer">
            <h2>{currentQuestion}</h2>
            <div>
              <button onClick={() => handleAnswer(1)}>Never</button>
              <button onClick={() => handleAnswer(2)}>Rarely</button>
              <button onClick={() => handleAnswer(3)}>Sometimes</button>
              <button onClick={() => handleAnswer(4)}>Often</button>
              <button onClick={() => handleAnswer(5)}>Always</button>
            </div>
          </div>
          <p>
            {currentIndex + 1}/{questions.length}
          </p>
        </>
      )}
      {quizLoop == "results" && (
        <>
          <h1>
            You scored {score}/{questions.length * 5}.
          </h1>
          {scorePercentage >= 85 && (
            <>
              <p>
                <strong>There's a high chance that you have anxiety. </strong>
                Don't worry! There's help for you. Here are some tips to deal
                with anxiety:
              </p>
              <ul>
                <li>
                  <strong>Talk to your doctor or therapist.</strong> Sometimes,
                  anxiety can be difficult to deal with, even when employing
                  certain strategies. Since anxiety is an inherited trait, it's
                  important to talk to your doctor or therapist about the
                  possibility of anxiety disorders and treatments for them.
                </li>
                <li>
                  <strong>Talk to an adult or guidance counsellor. </strong>
                  There are people out there to help you; you can always talk to
                  someone if you're feeling stressed out. If you're looking for
                  something more private, you can always contact the Kids Help
                  Phone by calling <a href="tel:11006686868">
                    1-800-668-6868
                  </a>{" "}
                  or by texting <a href="sms:686868">686868</a>.
                </li>
                <li>
                  <strong>Find your stressors.</strong> The next time you feel
                  overwhelmed, try to find what stresses you out. Knowing your
                  stressors can help you identify when symptoms you feel might
                  be caused by anxiety. Additionally, it will help you manage
                  your anxiety.
                </li>
                <li>
                  <strong>Develop coping methods.</strong> When you feel
                  overwhelmed, try something that calms you down. This method
                  works differently for everyone. Some people find peace in
                  meditation and music, whereas others might want to watch TV
                  and relax.
                </li>
              </ul>
            </>
          )}
          {scorePercentage < 85 && scorePercentage >= 50 && (
            <>
              <h2>There's a chance you might have anxiety</h2>
            </>
          )}
          {scorePercentage < 50 && (
            <>
              <h2>You're at low risk for having anxiety.</h2>
            </>
          )}
          <button onClick={() => setQuizLoop("menu")}>Restart Quiz</button>
        </>
      )}
    </>
  );
}

export default App;
