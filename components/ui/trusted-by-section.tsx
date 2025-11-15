"use client";

/**
 * Trusted By Section Component
 * 
 * Displays a scrolling list of company logos with fallback placeholders.
 * Uses Clearbit logo API for company logos.
 */

export function TrustedBySection() {
  // Company name to domain mapping for accurate logos
  const companyMap: Record<string, string> = {
    OpenAI: "openai.com",
    Amazon: "amazon.com",
    Apple: "apple.com",
    Microsoft: "microsoft.com",
    Google: "google.com",
    Meta: "meta.com",
    Netflix: "netflix.com",
    Tesla: "tesla.com",
    IBM: "ibm.com",
    Oracle: "oracle.com",
    Salesforce: "salesforce.com",
    Palantir: "palantir.com",
    McKinsey: "mckinsey.com",
    BCG: "bcg.com",
    Deloitte: "deloitte.com",
    Accenture: "accenture.com",
  };

  const companies = [
    "OpenAI",
    "Amazon",
    "Apple",
    "Microsoft",
    "Google",
    "Meta",
    "Netflix",
    "Tesla",
    "IBM",
    "Oracle",
    "Salesforce",
    "Palantir",
    "McKinsey",
    "BCG",
    "Deloitte",
    "Accenture",
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="w-full">
        <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider mb-12">
          Trusted by teams and institutions like
        </p>
        <div className="relative w-full">
          <div className="flex animate-scroll gap-8 opacity-60 grayscale">
            {companies.map((company, idx) => (
              <div
                key={`${company}-${idx}`}
                className="flex items-center justify-center gap-3 flex-shrink-0 px-6"
              >
                <img
                  src={`https://logo.clearbit.com/${companyMap[company]}`}
                  alt={company}
                  className="h-12 w-12 object-contain flex-shrink-0"
                  onError={(e) => {
                    // Fallback to placeholder if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="hidden h-12 w-12 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0">
                  <span className="text-xs font-bold text-slate-600">
                    {company.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-2xl font-semibold text-slate-400 whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {companies.map((company, idx) => (
              <div
                key={`${company}-dup-${idx}`}
                className="flex items-center justify-center gap-3 flex-shrink-0 px-6"
              >
                <img
                  src={`https://logo.clearbit.com/${companyMap[company]}`}
                  alt={company}
                  className="h-12 w-12 object-contain flex-shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLDivElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="hidden h-12 w-12 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0">
                  <span className="text-xs font-bold text-slate-600">
                    {company.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-2xl font-semibold text-slate-400 whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

