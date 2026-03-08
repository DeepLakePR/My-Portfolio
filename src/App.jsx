import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import LottiePlayer from "./components/ui/LottiePlayer";

import developing from "./assets/developing.json";

const floatTransition = {
  duration: 8,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
};

function App() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, { stiffness: 220, damping: 22, mass: 0.4 });
  const cursorY = useSpring(mouseY, { stiffness: 220, damping: 22, mass: 0.4 });

  const [canUseCursor, setCanUseCursor] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updatePointerCapability = () => {
      const isDesktopPointer = mediaQuery.matches;
      setCanUseCursor(isDesktopPointer);

      if (!isDesktopPointer) {
        setCursorVisible(false);
        mouseX.set(-100);
        mouseY.set(-100);
      }
    };

    updatePointerCapability();
    mediaQuery.addEventListener("change", updatePointerCapability);

    const handleMove = (event) => {
      if (!mediaQuery.matches) return;
      mouseX.set(event.clientX - 6);
      mouseY.set(event.clientY - 6);
      setCursorVisible(true);
    };

    const handleLeave = () => {
      setCursorVisible(false);
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerCapability);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isTransition) return undefined;

    const transitionTimeout = window.setTimeout(() => {
      window.location.href = "/legacy/index.html";
    }, 1500);

    return () => window.clearTimeout(transitionTimeout);
  }, [isTransition]);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#eaf2fb] text-[#1f2937]">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: isTransition ? "#8ea5c2" : "#eaf2fb" }}
        transition={{ duration: isTransition ? 1 : 0.75, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        aria-hidden
        animate={{ opacity: isTransition ? 0 : 1, scale: isTransition ? 1.04 : 1 }}
        transition={{ duration: isTransition ? 0.9 : 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,197,253,0.36),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(125,177,230,0.3),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(191,219,254,0.34),transparent_30%)]" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isTransition ? 0 : 1, scale: isTransition ? 1.06 : 1 }}
        transition={{ duration: isTransition ? 0.92 : 0.62, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute -left-24 top-4 h-80 w-80 rounded-full bg-[#9fd4f7]/80 blur-[120px]"
          animate={{ y: [0, 32, 0], opacity: [0.6, 1, 0.6] }}
          transition={floatTransition}
        />
        <motion.div
          className="absolute right-[-4rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-[#8db8e8]/85 blur-[140px]"
          animate={{ y: [14, -18, 14], opacity: [0.5, 0.9, 0.5] }}
          transition={floatTransition}
        />
        <motion.div
          className="absolute bottom-[-3rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#b8dbfa]/65 blur-[120px]"
          animate={{ y: [0, -24, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={floatTransition}
        />
      </motion.div>

      {canUseCursor && cursorVisible && !isTransition && (
        <>
          <motion.div
            style={{ translateX: cursorX, translateY: cursorY }}
            className="pointer-events-none fixed z-30 h-10 w-10 rounded-full bg-[#8ec4f1]/35 blur-lg"
          />
          <motion.div
            style={{ translateX: cursorX, translateY: cursorY }}
            className="pointer-events-none fixed z-30 h-2 w-2 rounded-full bg-[#2e3a49]/85 shadow-[0_0_18px_6px_rgba(125,177,230,0.42)]"
          />
        </>
      )}

      <motion.main
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12"
        animate={{
          opacity: isTransition ? 0 : 1,
          scale: isTransition ? 0.95 : 1,
          y: isTransition ? 24 : 0,
          filter: isTransition ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: isTransition ? 0.92 : 0.62, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="grid items-center gap-0 px-4 py-8 text-center sm:text-left lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-12">
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            >
              <motion.div
                className="space-y-2 sm:space-y-4"
                animate={{ opacity: isTransition ? 0 : 1, y: isTransition ? 16 : 0 }}
                transition={{ duration: isTransition ? 0.82 : 0.42, ease: "easeOut" }}
              >
                <p className="text-lg leading-relaxed text-[#273244]/92">
                  Calma, não deu erro! Haha. Eu só estou preparando algo bem mais moderno para te
                  mostrar. Enquanto a mágica acontece por aqui, deixei o meu portfólio antigo
                  disponível caso você queira dar aquela conferida no que eu já fiz.
                </p>
                <p className="text-sm leading-relaxed text-[#5f738b]/90" style={{ letterSpacing: 0.25 }}>
                  Algumas informações do portfólio antigo podem estar desatualizadas.
                </p>
              </motion.div>

              <motion.button
                whileHover={
                  isTransition
                    ? undefined
                    : {
                        scale: 1.03,
                        y: -2,
                        backgroundColor: "#0054a8",
                        boxShadow: "0 16px 40px -22px rgba(92,140,196,0.55)",
                      }
                }
                whileTap={isTransition ? undefined : { scale: 0.985, y: 0 }}
                onClick={() => setIsTransition(true)}
                disabled={isTransition}
                className="bg-[#3888d7] px-6 py-3 text-sm text-[#FAF9F6] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_25px_-18px_rgba(84,123,170,0.85)] transition-colors duration-50 [clip-path:polygon(10px_0,100%_0,calc(100%_-_10px)_100%,0_100%)] disabled:pointer-events-none"
                style={{ letterSpacing: 0.25 }}
                animate={{ opacity: isTransition ? 0 : 1, scale: isTransition ? 0.92 : 1 }}
                transition={{ duration: isTransition ? 0.85 : 0.45, ease: "easeOut" }}
              >
                Versão antiga
              </motion.button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{
                opacity: isTransition ? 0 : 1,
                y: isTransition ? 32 : 0,
                scale: isTransition ? 0.9 : 1,
              }}
              transition={{ delay: 0.3, duration: isTransition ? 1.2 : 0.8, ease: "easeOut" }}
              whileHover={isTransition ? undefined : { rotateX: 1.5, rotateY: -2, translateZ: 6 }}
            >
              <div className="relative overflow-hidden sm:px-6 sm:py-4">
                <motion.div
                  className="sm:mt-4 flex items-center justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LottiePlayer animationData={developing} className="h-[225px] sm:h-[350px] w-[300px] sm:w-[400px]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        animate={{ opacity: isTransition ? 1 : 0 }}
        transition={{ duration: isTransition ? 1 : 0.5, delay: 0.35, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(180deg, rgba(185, 208, 232, 0.15) 0%, rgba(117, 143, 171, 0.95) 100%)",
        }}
      />
    </div>
  );
}

export default App;
