import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Loading = () => {
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-transparent">
      <div
        ref={spinnerRef}
        className="loading-spinner w-16 h-16 border-4 border-t-neutral-500 border-neutral-300 rounded-full"
      ></div>
      <p
        className="mt-4 text-neutral-500 text-lg"
        ref={(el) => {
          if (el) {
            gsap.fromTo(
              el,
              { opacity: 0 },
              { opacity: 1, repeat: -1, yoyo: true, duration: 1.5 }
            );
          }
        }}
      >
        Cargando...
      </p>
    </section>
  );
};
