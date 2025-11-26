export default function StepCard({
  number,
  title,
  description,
  color,
}: {
  number: string
  title: string
  description: string
  color: 'cyan' | 'purple' | 'pink'
}) {
  const gradients = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    pink: 'from-pink-500 to-rose-500',
  }

  return (
    <div className="text-center">
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div
          className={`absolute inset-0 animate-pulse rounded-full bg-gradient-to-r ${gradients[color]} opacity-20 blur-xl`}
        />
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${gradients[color]} text-2xl font-bold text-white shadow-lg`}
        >
          {number}
        </div>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  )
}