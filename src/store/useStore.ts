import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ARTIFACTS, ROOMS, type ArtifactData, type RoomData } from "@/data/museumData";

type DebateVote = "progress" | "regression" | null;

interface MuseumState {
  activeRoomId: string;
  activeArtifactId: string | null;
  visitedArtifactIds: string[];
  debateVote: DebateVote;
  setActiveRoom: (roomId: string) => void;
  setActiveArtifact: (artifactId: string | null) => void;
  setDebateVote: (vote: Exclude<DebateVote, null>) => void;
  getCurrentRoom: () => RoomData;
  getActiveArtifact: () => ArtifactData | null;
}

export const useStore = create<MuseumState>()(
  persist(
    (set, get) => ({
      activeRoomId: "main-hall",
      activeArtifactId: null,
      visitedArtifactIds: [],
      debateVote: null,
      setActiveRoom: (roomId) => set({ activeRoomId: roomId, activeArtifactId: null }),
      setActiveArtifact: (artifactId) => {
        if (!artifactId) {
          set({ activeArtifactId: null });
          return;
        }
        const visited = get().visitedArtifactIds;
        set({
          activeArtifactId: artifactId,
          visitedArtifactIds: visited.includes(artifactId) ? visited : [...visited, artifactId],
        });
      },
      setDebateVote: (debateVote) => set({ debateVote }),
      getCurrentRoom: () => ROOMS.find((room) => room.id === get().activeRoomId) ?? ROOMS[0],
      getActiveArtifact: () => ARTIFACTS.find((artifact) => artifact.id === get().activeArtifactId) ?? null,
    }),
    {
      name: "khoan-ho-museum-progress",
      partialize: (state) => ({ debateVote: state.debateVote, visitedArtifactIds: state.visitedArtifactIds }),
    },
  ),
);
