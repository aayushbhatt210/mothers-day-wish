import { SparklesText } from "@/components/ui/sparkles-text";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";

type EndScreenProps = {
  onRestart: () => void;
};

export function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-light-cream to-cream px-6">
      <Confetti trigger={1} count={55} />
      <div className="relative z-10 text-center">
        <SparklesText
          text="Thank you for everything and Love you"
          className="text-3xl font-bold md:text-5xl"
          sparkleCount={12}
          sparkleDelay={200}
        />
        <p className="mt-5 text-body-text">Every memory with you is a blessing, Mom.</p>
        <Button size="lg" className="mt-10" onClick={onRestart}>
          <SparklesText
            text="Back to Start"
            as="span"
            className="text-lg font-semibold text-white"
            sparkleCount={6}
            spawnRadius={15}
          />
        </Button>
      </div>
    </section>
  );
}
