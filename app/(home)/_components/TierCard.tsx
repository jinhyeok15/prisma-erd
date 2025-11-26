export default function TierCard({
  title,
  description,
  gradient,
  borderGradient,
  highlight = false,
}: {
  title: string
  description: string
  gradient: string
  borderGradient: string
  highlight?: boolean
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl p-1 transition-all ${highlight ? 'scale-105' : 'hover:scale-105'}`}
    >
      <div
        className={`absolute -inset-1 animate-pulse rounded-xl bg-gradient-to-r ${borderGradient} opacity-30 blur`}
      />
      <div
        className={`relative rounded-lg bg-gradient-to-br ${gradient} p-6 ${highlight ? 'shadow-2xl' : ''}`}
      >
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className={`mt-2 ${highlight ? 'text-gray-200' : 'text-gray-400'}`}>{description}</p>
      </div>
    </div>
  )
}