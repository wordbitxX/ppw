"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteReview } from "@/lib/reviews";
import { siteConfig } from "@/lib/site";
import { ArrowRight } from "@/components/icons";

/**
 * Homepage testimonials — at most three, and only real ones.
 *
 * They come from the same moderated store as the About page (/api/reviews):
 * reviews submitted through the form by people who worked with us. Nothing is
 * seeded or written by us (see the note in src/lib/reviews.ts). When there are
 * none yet, the block collapses to the public Google record plus a path to
 * leave a review, rather than a gallery of placeholders.
 */
export function FeaturedReviews() {
  const [reviews, setReviews] = useState<SiteReview[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data: { reviews?: SiteReview[] }) => {
        if (!cancelled) setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      })
      .catch(() => {
        if (!cancelled) setReviews([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Best-rated first, newest first within a rating (the API is newest-first).
  const top = (reviews ?? [])
    .map((review, order) => ({ review, order }))
    .sort((a, b) => b.review.rating - a.review.rating || a.order - b.order)
    .slice(0, 3)
    .map((entry) => entry.review);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Client reviews</p>
          <h2 className="mt-3 text-[1.65rem] font-semibold leading-[1.15] text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            What clients say
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Only real reviews, written by people who worked with us — never invented. Our Google reviews stay on our
            Google Business Profile.
          </p>
        </div>
        <Link
          href="/about#reviews"
          className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-navy-800/15 bg-white px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          More reviews &amp; credentials
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-10 min-h-[11rem]">
        {top.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {top.map((review) => (
              <figure
                key={`${review.name}-${review.quote.slice(0, 24)}`}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_50px_-42px_rgba(5,13,33,0.45)]"
              >
                <p className="text-sm tracking-wide text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}
                  <span className="text-slate-300">{"★".repeat(5 - review.rating)}</span>
                </p>
                <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">{review.name}</span>
                    <span className="block text-xs text-ink-500">
                      {review.place} · {review.industry}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-5">
              <span className="text-4xl font-semibold text-ink-900">
                {siteConfig.googleRating}
                <span className="ml-1 text-2xl text-amber-500">★</span>
              </span>
              <p className="max-w-md text-sm leading-relaxed text-ink-500">
                {siteConfig.googleReviewCount} Google reviews on our Business Profile — a public record we cannot edit.
                On-site reviews appear here the moment a client publishes one.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Review us on Google
              </a>
              <Link
                href="/about#reviews"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-300"
              >
                Write a review
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
