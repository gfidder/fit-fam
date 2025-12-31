interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
}

export function StatCard({ title, value, subtext }: StatCardProps) {
  return (
    <div className="gradient-purple rounded-xl p-6 text-center text-white">
      <h3 className="mb-2 text-sm tracking-wide uppercase opacity-80">
        {title}
      </h3>
      <p className="mb-1 text-4xl font-bold">{value}</p>
      <p className="text-sm opacity-70">{subtext}</p>
    </div>
  );
}
