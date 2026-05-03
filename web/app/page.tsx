import "./globals.scss";

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
      <h1>Welcome to Bubbasaur Games</h1>

      <p style={{ fontSize: "1.2rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
        A fun and friendly place for kids and parents to play word games together. Start a new game, practice spelling, and enjoy easy-to-understand challenges that are perfect for family time.
      </p>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2>What you can do here</h2>
        <ul style={{ fontSize: "1rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
          <li>Play word puzzles made for elementary-age kids.</li>
          <li>Learn spelling and word guessing in a simple way.</li>
          <li>Enjoy more than one puzzle a day — play again and again.</li>
          <li>Invite family members to take turns guessing and cheering each other on.</li>
        </ul>
      </section>

      <section>
        <h2>How to get started</h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.8 }}>
          Tap the game menu to choose a word game, then follow the friendly on-screen instructions. If you are a parent, this is a safe and simple spot for kids to practice words and have fun together.
        </p>
      </section>
    </main>
  );
}
