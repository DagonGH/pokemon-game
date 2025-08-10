import confetti, { type Options } from 'canvas-confetti'

export default function launchConfetti() {
  const defaults = {
    origin: { y: 0.7 },
  }

  const fire = (particleRatio: number, opts: Options) => {
    const count = 200 // Total de partículas base para el efecto completo
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}
