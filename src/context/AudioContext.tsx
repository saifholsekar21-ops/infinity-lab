import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface AudioContextType {
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  playHoverSound: () => void;
  playScrollSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  // Refs for Web Audio API components
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize the AudioContext for short sound effects
  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
  };

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }

    setIsAudioPlaying((prev) => !prev);
  };

  const playHoverSound = () => {
    if (!isAudioPlaying || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // High, sweet elegant click
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.012, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Ignore audio errors gracefully
    }
  };

  const playScrollSound = () => {
    if (!isAudioPlaying || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "triangle";
      // Deep, soft woody section transition bump
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.06);

      gainNode.gain.setValueAtTime(0.025, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {
      // Ignore audio errors gracefully
    }
  };

  // Clean up AudioContext on component unmount
  useEffect(() => {
    return () => {
      try {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch (e) {
        // Silently ignore cleanup errors
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isAudioPlaying, toggleAudio, playHoverSound, playScrollSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
