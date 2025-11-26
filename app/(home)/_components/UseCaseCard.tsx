export default function UseCaseCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="group rounded-xl bg-slate-900/50 p-6 backdrop-blur-sm transition-all hover:bg-slate-800/50">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
  )
}