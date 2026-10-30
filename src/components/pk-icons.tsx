import type { SVGProps } from "react";

/**
 * Small line icons used only by the /pk landing page.
 *
 * They share the 24×24, 1.6-stroke geometry of `src/components/icons.tsx` so
 * the page reads as part of the same system, but they live here rather than in
 * the global icon set because no other page uses them yet.
 */
type IconProps = SVGProps<SVGSVGElement>;
export type PkIconName =
  | "pin"
  | "chat"
  | "doc"
  | "lock"
  | "mobile"
  | "globe"
  | "badge"
  | "cash"
  | "wallet"
  | "receipt"
  | "courier"
  | "language"
  | "pos";

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PkIcon({ name, ...props }: IconProps & { name: PkIconName }) {
  switch (name) {
    case "pin":
      return (
        <Base {...props}>
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </Base>
      );
    case "chat":
      return (
        <Base {...props}>
          <path d="M20.5 12.2c0 4-3.8 7.2-8.5 7.2-1 0-2-.15-2.9-.4L4 20.5l1.3-3.6A6.9 6.9 0 0 1 3.5 12.2C3.5 8.2 7.3 5 12 5s8.5 3.2 8.5 7.2Z" />
          <path d="M8.8 12h.01M12 12h.01M15.2 12h.01" />
        </Base>
      );
    case "doc":
      return (
        <Base {...props}>
          <path d="M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5Z" />
          <path d="M14 3.5v4h4M9 13h6M9 16.5h4" />
        </Base>
      );
    case "lock":
      return (
        <Base {...props}>
          <rect x="4.5" y="10" width="15" height="10.5" rx="2" />
          <path d="M8 10V7.6a4 4 0 0 1 8 0V10" />
          <path d="M12 14.2v2.4" />
        </Base>
      );
    case "mobile":
      return (
        <Base {...props}>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="M10.5 5.5h3M10.8 18.3h2.4" />
        </Base>
      );
    case "globe":
      return (
        <Base {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.5 9.5h17M3.5 14.5h17" />
          <path d="M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9Z" />
        </Base>
      );
    case "badge":
      return (
        <Base {...props}>
          <path d="m12 2.8 2.3 1.6 2.8-.2 1.1 2.6 2.3 1.6-.7 2.7.7 2.7-2.3 1.6-1.1 2.6-2.8-.2L12 21.2l-2.3-1.6-2.8.2-1.1-2.6-2.3-1.6.7-2.7-.7-2.7 2.3-1.6L6.9 4.2l2.8.2Z" />
          <path d="m9 12 2.1 2.1L15.2 10" />
        </Base>
      );
    case "cash":
      return (
        <Base {...props}>
          <rect x="2.5" y="6" width="19" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M6 9.5v.01M18 14.5v.01" />
        </Base>
      );
    case "wallet":
      return (
        <Base {...props}>
          <path d="M3.5 8.2A2.2 2.2 0 0 1 5.7 6h11.6A2.2 2.2 0 0 1 19.5 8.2v1.3" />
          <rect x="3.5" y="8.2" width="17" height="10.3" rx="2.2" />
          <path d="M16.2 13.4h1.6" />
          <path d="M3.5 11h17" />
        </Base>
      );
    case "receipt":
      return (
        <Base {...props}>
          <path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4Z" />
          <path d="M9 8h6M9 11.5h6M9 15h3" />
        </Base>
      );
    case "courier":
      return (
        <Base {...props}>
          <path d="M2.8 6.5h9.4v9.8H2.8z" />
          <path d="M12.2 10h3.6l3.4 3.2v3.1h-7Z" />
          <circle cx="6.8" cy="18.2" r="1.6" />
          <circle cx="16.4" cy="18.2" r="1.6" />
        </Base>
      );
    case "language":
      return (
        <Base {...props}>
          <path d="M3.5 5.5h8M7.5 3.5v2M9.7 5.5c-.6 4-3 6.6-6.2 7.8" />
          <path d="M5.5 9.2c1.3 2 3.4 3.4 5.6 4" />
          <path d="m12.8 20.5 3.7-9 3.7 9M14.2 17.4h4.6" />
        </Base>
      );
    case "pos":
      return (
        <Base {...props}>
          <rect x="4.5" y="2.8" width="15" height="11" rx="2" />
          <path d="M7.5 6.3h9M7.5 9.6h5" />
          <path d="M3 18h18v1.2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        </Base>
      );
    default:
      return null;
  }
}
