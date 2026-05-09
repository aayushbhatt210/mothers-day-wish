import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { InteractionZone } from "@/components/InteractionZone";
import { Album } from "@/components/Album";
import { EndScreen } from "@/components/EndScreen";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/useAudio";

type Step = "landing" | "interactive" | "album" | "end";

function App() {
  const [step, setStep] = useState<Step>("landing");
  const audio = useAudio();

  useEffect(() => {
    // Try to start immediately (may be blocked by browser)
    audio.startBackground();

    // Start on first interaction to bypass browser autoplay restrictions
    const handleInteraction = () => {
      audio.startBackground();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [audio]);

  const renderStep = () => {
    switch (step) {
      case "landing":
        return (
          <LandingPage
            onStart={() => {
              audio.startBackground();
              setStep("interactive");
            }}
          />
        );
      case "interactive":
        return (
          <InteractionZone
            onContinue={() => setStep("album")}
            onPlayEffect={audio.playEffect}
            onAnyButtonClick={audio.playRandomVoiceNote}
          />
        );
      case "album":
        return <Album onDone={() => setStep("end")} onPageTurn={() => audio.playEffect("pageTurn")} />;
      case "end":
        return (
          <EndScreen
            onRestart={() => {
              audio.stopBackground();
              setTimeout(() => setStep("landing"), 700);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen bg-cream font-[Inter,sans-serif] text-body-text">
      <div className="fixed right-4 top-4 z-50">
        <Button
          variant="secondary"
          className="h-10 w-10 rounded-full p-0"
          onClick={() => audio.setMuted((value) => !value)}
          aria-label={audio.muted ? "Unmute audio" : "Mute audio"}
        >
          {audio.muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
      {renderStep()}
    </main>
  );
}

export default App;
