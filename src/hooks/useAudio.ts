import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Howl } from "howler";

type EffectName = "balloon" | "heart" | "sparkle" | "confetti" | "message" | "pageTurn";

const keys: EffectName[] = ["balloon", "heart", "sparkle", "confetti", "message", "pageTurn"];

const effectFile: Record<EffectName, string> = {
  balloon: "/assets/audio/balloonPop.mp3",
  heart: "/assets/audio/heartChime.mp3",
  sparkle: "/assets/audio/sparkleSound.mp3",
  confetti: "/assets/audio/confettiPop.mp3",
  message: "/assets/audio/messageAppear.mp3",
  pageTurn: "/assets/audio/pageTurn.mp3",
};

export function useAudio() {
  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem("mib-muted");
    return saved === "true";
  });
  const initializedRef = useRef(false);

  const background = useMemo(
    () =>
      new Howl({
        src: ["/assets/audio/background.mp3"],
        loop: true,
        volume: 0.35,
        html5: true,
        onloaderror: (id, error) => console.error("Audio Load Error:", error),
        onplayerror: (id, error) => {
          console.warn("Audio Play Blocked. Waiting for interaction...");
          background.once("unlock", () => background.play());
        }
      }),
    []
  );

  const effects = useMemo(
    () =>
      Object.fromEntries(
        keys.map((key) => [
          key,
          new Howl({
            src: [effectFile[key]],
            volume: 0.55,
            html5: true,
          }),
        ])
      ) as Record<EffectName, Howl>,
    []
  );

  const voiceNotes = useMemo(
    () =>
      ["/assets/audio/audio1.opus", "/assets/audio/audio2.opus", "/assets/audio/audio3.opus"].map(
        (src) =>
          new Howl({
            src: [src],
            volume: 0.75,
            html5: true,
          })
      ),
    []
  );

  useEffect(() => {
    background.mute(muted);
    keys.forEach((key) => effects[key].mute(muted));
    localStorage.setItem("mib-muted", String(muted));
  }, [muted, background, effects]);

  useEffect(() => {
    return () => {
      background.unload();
      keys.forEach((key) => effects[key].unload());
      voiceNotes.forEach((voice) => voice.unload());
    };
  }, [background, effects, voiceNotes]);

  const startBackground = useCallback(() => {
    if (!initializedRef.current || !background.playing()) {
      background.play();
      initializedRef.current = true;
    }
  }, [background]);

  const stopBackground = useCallback(() => {
    background.fade(background.volume(), 0, 600);
    setTimeout(() => background.stop(), 650);
  }, [background]);

  const playEffect = useCallback(
    (effect: EffectName) => {
      effects[effect].stop();
      effects[effect].play();
    },
    [effects]
  );

  const playRandomVoiceNote = useCallback(() => {
    const voice = voiceNotes[Math.floor(Math.random() * voiceNotes.length)];
    voiceNotes.forEach((clip) => clip.stop());
    voice.play();
  }, [voiceNotes]);

  return {
    muted,
    setMuted,
    startBackground,
    stopBackground,
    playEffect,
    playRandomVoiceNote,
  };
}
