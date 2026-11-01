import Link from 'next/link';
import { Section, SectionHeading } from './ui';
import { FaqSchema } from './jsonld';
import { RichText } from './rich-text';
import type { Question } from '@/lib/question-bank';
export function Questions({title='Questions, answered',items,schema=true}: {title?:string;items:Question[];schema?:boolean}) {
 return <Section><SectionHeading eyebrow="FAQ" title={title}/><div className="mt-8 space-y-3">{items.map(q=><details key={q.question} className="rounded-2xl border border-slate-200 p-5"><summary className="cursor-pointer font-medium text-ink-900">{q.question}</summary><p className="mt-3 text-sm leading-relaxed text-ink-700"><RichText text={q.answer}/> <Link href={q.href} className="font-medium text-brand-600 underline">Read the full guide or service details</Link>.</p></details>)}</div><p className="mt-5"><Link href="/faqs" className="text-brand-600 underline">Browse all questions in the FAQ hub</Link></p>{schema && <FaqSchema faqs={items.map(q=>({question:q.question,answer:`${q.answer} Read more: ${q.href}`}))}/>}</Section>;
}
