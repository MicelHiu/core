import { Navigation } from "@/components/user/Navigation";


const MAPS_EMBED_URL = "https://maps.google.com/maps?q=warnet+gaming&output=embed";
const MAPS_LINK_URL =
  "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwig9_ag__aWAxUAAAAAHQAAAAAQCQ..i&sca_esv=1a1cf151c48bf507&fvr=1&pvq=Cg0vZy8xMXg3ejJfbTQ2IhMKDXdhcm5ldCBnYW1pbmcQAhgD&lqi=Cg13YXJuZXQgZ2FtaW5nSIaZv-GfvICACFoZEAAQARgBIg13YXJuZXQgZ2FtaW5nMgJpZJIBDWludGVybmV0X2NhZmWaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjF6ZVZVelRuRmtiVzh4WkZSR1RWVXdOVmRXTTFZeVZETmtaazlGUlJBQvoBBAgAED4&cs=1&um=1&ie=UTF-8&fb=1&gl=id&sa=X&ftid=0x2e69f7c636cdc87d:0x9daeb19601843427";

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="warnet-bg min-h-screen px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-start">
          {/* Left column */}
          <div>
            <span className="inline-block rounded-full border border-lilac px-4 py-1 text-sm text-pale">
              Contact us
            </span>

            <h1 className="mt-6 font-heading text-4xl text-pale md:text-5xl">
              We&apos;re here to help
            </h1>

            <p className="mt-4 max-w-md text-pale/70">
              Need support or have a question? We&apos;re here to help. Email,
              call, or visit us directly to learn how our warnet can solve
              your problem.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {/* Email */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-lilac">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-lilac"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span className="text-pale">support@core.com</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-lilac">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-lilac"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h2.28a1 1 0 01.97.76l1.1 4.4a1 1 0 01-.5 1.12l-1.7.85a12.04 12.04 0 006 6l.85-1.7a1 1 0 011.12-.5l4.4 1.1a1 1 0 01.76.97V19a2 2 0 01-2 2h-1C9.16 21 3 14.84 3 7V5z"
                    />
                  </svg>
                </span>
                <span className="text-pale">(+62) 811-950-5559</span>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-lilac">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-lilac"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                  </svg>
                </span>
                <span className="text-pale">Every day, 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right column - GPS/location card replacing "Let's talk" */}
          <div className="rounded-2xl border border-lilac bg-purple/30 p-6">
            <h2 className="font-heading text-2xl text-pale">Find us here</h2>
            <p className="mt-1 text-sm text-pale/70">CORE</p>

            <div className="mt-4 overflow-hidden rounded-xl border border-lilac">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Warnet Gaming location"
              />
            </div>

            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block w-full rounded-lg bg-lilac py-3 text-center font-semibold text-darkpurple hover:bg-pale"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </main>
    </>
  );
}