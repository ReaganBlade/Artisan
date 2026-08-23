"use client";

import { Button } from "@/components/button";
import { Stamp } from "@/components/stamp";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#f5f3ec",
          color: "#101010",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            textAlign: "center",
          }}
        >
          <Stamp tone="signal" rotate={-3}>
            Critical Error
          </Stamp>
          <h1
            style={{
              marginTop: "1.5rem",
              fontSize: "2.5rem",
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
            }}
          >
            Something went very wrong
          </h1>
          <p
            style={{
              marginTop: "1rem",
              maxWidth: "24rem",
              margin: "1rem auto 0",
              lineHeight: 1.6,
            }}
          >
            Artisan hit an unexpected error. The page needs to be reloaded.
          </p>
          {error.digest && (
            <p
              style={{
                marginTop: "0.5rem",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                opacity: 0.5,
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <div style={{ marginTop: "2rem" }}>
            <Button onClick={reset} variant="acid" size="md">
              Reload page
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
