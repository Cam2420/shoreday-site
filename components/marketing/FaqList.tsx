import { type Faq } from "@/data/shoreday";
import { FaqSchema } from "./StructuredData";
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <>
      <FaqSchema items={items} />
      <div className="faq-list">
        {items.map(({ q, a }) => (
          <details className="faq-item" key={q}>
            <summary>{q}</summary>
            <p className="faq-answer">{a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
