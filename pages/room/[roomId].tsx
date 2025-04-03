import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMatchAllRoom } from "../../lib/useMatchAllRoom";

const CATEGORIES = [
  { key: "movies", label: "🎬 Фильмы" },
  { key: "books", label: "📚 Книги" },
  { key: "music", label: "🎵 Музыка" },
  { key: "foods", label: "🍕 Еда" }
];

type InputsState = { [key: string]: string[] };
type SubmittedState = { [key: string]: boolean };
type ScoresState = { [key: string]: number };

export default function MatchAllGame() {
  const router = useRouter();
  const { roomId, name } = router.query;
  const playerName = Array.isArray(name) ? name[0] : name || "";
  const { players, answers, submitAnswers } = useMatchAllRoom(roomId, playerName);

  const [activeTab, setActiveTab] = useState<string>("movies");
  const [inputs, setInputs] = useState<InputsState>({
    movies: ["", "", ""],
    books: ["", "", ""],
    music: ["", "", ""],
    foods: ["", "", ""]
  });
  const [submitted, setSubmitted] = useState<SubmittedState>({});
  const [scores, setScores] = useState<ScoresState>({});

  const handleChange = (category: string, index: number, value: string) => {
    const updated = { ...inputs };
    updated[category][index] = value;
    setInputs(updated);
  };

  const handleSubmit = async (category: string) => {
    await submitAnswers(category, inputs[category]);
    setSubmitted((prev) => ({ ...prev, [category]: true }));
  };

  useEffect(() => {
    const computeScore = () => {
      const newScores: ScoresState = {};
      CATEGORIES.forEach(({ key }) => {
        const myEntry = answers.find(a => a.player === playerName && a.category === key);
        if (!myEntry) return;

        let score = 0;
        answers.forEach((a) => {
          if (a.category !== key || a.player === playerName) return;
          myEntry.values.forEach((val: string) => {
            if (a.values.includes(val)) {
              score++;
            }
          });
        });
        newScores[key] = score;
      });
      setScores(newScores);
    };

    if (answers.length) computeScore();
  }, [answers, playerName]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>🎲 MatchAll: {playerName}</h1>
      <p style={{ textAlign: "center", fontSize: 12, color: "gray" }}>Комната: {roomId}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            style={{
              padding: "6px 10px",
              backgroundColor: activeTab === cat.key ? "#ddd" : "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        {!submitted[activeTab] ? (
          <div style={{ textAlign: "center" }}>
            <p>Введите 3 любимых варианта:</p>
            {inputs[activeTab].map((value, idx) => (
              <input
                key={idx}
                placeholder={`Вариант ${idx + 1}`}
                value={value}
                onChange={(e) => handleChange(activeTab, idx, e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: 8,
                  margin: "8px 0",
                  borderRadius: 4,
                  border: "1px solid #ccc"
                }}
              />
            ))}
            <button
              onClick={() => handleSubmit(activeTab)}
              style={{
                marginTop: 10,
                padding: "10px 20px",
                border: "none",
                backgroundColor: "#333",
                color: "white",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Отправить
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 18 }}>Вы набрали {scores[activeTab] || 0} балл(а/ов) 🎉</p>
            <p style={{ fontSize: 12, color: "gray" }}>
              Ваши ответы: {inputs[activeTab].join(", ")}
            </p>
          </div>
        )}
      </div>

      <div style={{ paddingTop: 30, textAlign: "center" }}>
        <h2>Игроки в комнате:</h2>
        <ul style={{ fontSize: 12, color: "gray" }}>
          {players.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
