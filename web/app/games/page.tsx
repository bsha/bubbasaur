import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Games</h1>

      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/games/wordle">Wordle</Link>
      </nav>
    </main>
  );
}
