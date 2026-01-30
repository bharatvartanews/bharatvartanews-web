import { getRashiDetail } from "@/app/lib/astrology";

export default async function RashiPage({ params }: any) {
  const data = await getRashiDetail(params.rashi);

  const paragraphs = data.general.split(". ");

  return (
    <main className="container">
      <article className="astro-article">
        <h1>
          {data.rashi.toUpperCase()} Horoscope
        </h1>

        <p className="astro-date">
          {data.date}
        </p>

        <div className="astro-section">
          <h3>🌟 General</h3>

          {paragraphs.map((p: string, i: number) => (
            <p key={i}>{p}.</p>
          ))}
        </div>
      </article>
    </main>
  );
}
