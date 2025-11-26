export default function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: string
  title: string
  description: string
  gradient: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:bg-slate-800/50">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-5`}
      />
      <div className="relative">
        <div className="text-4xl">{icon}</div>
        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
    </div>
  )
}