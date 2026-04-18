import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-5xl mb-6">🔍</p>
      <h1 className="text-2xl font-bold text-slate-100 mb-3">Repository nicht gefunden</h1>
      <p className="text-slate-500 mb-8">
        Dieses Repository existiert nicht auf GitHub oder ist privat.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
      >
        Andere URL analysieren
      </Link>
    </div>
  );
}
