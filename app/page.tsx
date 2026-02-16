import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-4">
            WakilChat™
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-lora">
            Ethiopia's Premier B2B Marketplace
          </p>
          <p className="text-lg text-muted-foreground/80 mt-2 font-amharic">
            የኢትዮጵያ ዋና የንግድ ድርጅት መድረክ
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="luxury-card p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-sm text-muted-foreground">
              Smart algorithms connect buyers with perfect sellers instantly
            </p>
          </div>

          <div className="luxury-card p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Chat</h3>
            <p className="text-sm text-muted-foreground">
              Negotiate deals with built-in translation (English ↔ Amharic)
            </p>
          </div>

          <div className="luxury-card p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">
              Ethiopian carrier billing & mobile money integration
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/auth/signup"
            className="luxury-button inline-block text-center"
          >
            Get Started Free
          </Link>
          
          <Link
            href="/auth/login"
            className="px-8 py-3 bg-secondary hover:bg-accent border border-border rounded-lg font-semibold transition-all text-center"
          >
            Login
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div>
            <div className="text-2xl font-bold text-primary">Phase 1</div>
            <div>MVP in Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">11</div>
            <div>Product Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">2</div>
            <div>Languages Supported</div>
          </div>
        </div>

        {/* Tech Badge */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Built with enterprise technology</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="px-3 py-1 bg-secondary rounded-full">Next.js 14</span>
            <span className="px-3 py-1 bg-secondary rounded-full">Supabase</span>
            <span className="px-3 py-1 bg-secondary rounded-full">Prisma</span>
            <span className="px-3 py-1 bg-secondary rounded-full">Claude AI</span>
            <span className="px-3 py-1 bg-secondary rounded-full">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  )
}
