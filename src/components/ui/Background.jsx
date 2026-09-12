export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <div
        className="bg-grid absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent 75%)",
        }}
      />
      <div className="animate-float-slow absolute inset-x-0 top-[-10rem] mx-auto h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-3xl dark:bg-accent/20" />
      <div className="animate-float-slow absolute right-[-8rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-500/10 [animation-delay:-3s]" />
      <div className="animate-float-slow absolute bottom-[-6rem] left-[-6rem] h-[22rem] w-[22rem] rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/15 [animation-delay:-6s]" />
      <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-bg to-transparent" />
    </div>
  );
}