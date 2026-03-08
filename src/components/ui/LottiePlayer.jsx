import Lottie from "lottie-react";

function LottiePlayer({ animationData, loop = true, autoplay = true, className }) {
  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
}

export default LottiePlayer;
