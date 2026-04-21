import Link from "next/link";
import "./globals.scss";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Home</h1>

      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/games">Games</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </main>
  );
}
