export default function ReadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="reading-mode">
      <article className="article-card">
        {children}
      </article>
    </div>
  );
}
