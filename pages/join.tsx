import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function JoinPage() {
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const handleCreateRoom = () => {
    const roomId = uuidv4().slice(0, 6);
    router.push(`/room/${roomId}?name=${encodeURIComponent(playerName)}`);
  };

  const handleJoinRoom = () => {
    const roomId = prompt("Введите ID комнаты");
    if (roomId) {
      router.push(`/room/${roomId}?name=${encodeURIComponent(playerName)}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        🎮 Добро пожаловать в MatchAll
      </h1>
      <input
        placeholder="Введите ваше имя"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 20,
          border: "1px solid #ccc",
          borderRadius: 4
        }}
      />
      <button
        onClick={handleCreateRoom}
        disabled={!playerName}
        style={{
          width: "100%",
          marginTop: 12,
          padding: 10,
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Создать комнату
      </button>
      <button
        onClick={handleJoinRoom}
        disabled={!playerName}
        style={{
          width: "100%",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Присоединиться к комнате
      </button>
    </div>
  );
}
