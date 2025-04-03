import { useEffect, useState } from "react";
import { 
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import { initFirebase } from "./firebaseConfig";

// Инициализируем Firebase при запуске хука
initFirebase();
const db = getFirestore();

export function useMatchAllRoom(
  roomId: string | string[] | undefined,
  playerName: string | string[] | undefined
) {
  const [players, setPlayers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    if (!roomId) return;
    const roomRef = doc(db, "rooms", String(roomId));
    const unsub = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setPlayers(data.players || []);
        setAnswers(data.answers || []);
      }
    });
    return () => unsub();
  }, [roomId]);

  const submitAnswers = async (category: string, inputArray: string[]) => {
    if (!roomId || !playerName) return;
    const roomRef = doc(db, "rooms", String(roomId));
    const roomSnap = await getDoc(roomRef);
    let current = roomSnap.exists() ? roomSnap.data() : {};

    const updatedAnswers = [
      ...(current.answers || []),
      {
        player: playerName,
        category,
        values: inputArray.map((v) => v.trim().toLowerCase()),
        timestamp: serverTimestamp()
      }
    ];

    const updatedPlayers = current.players?.includes(playerName)
      ? current.players
      : [...(current.players || []), playerName];

    await setDoc(roomRef, {
      answers: updatedAnswers,
      players: updatedPlayers
    });
  };

  return {
    players,
    answers,
    submitAnswers
  };
}
