import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="w-full mt-20 border-t border-themeGray py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">Jhiadle.</h3>
          <p className="text-sm text-muted-foreground">
            Building vibrant online communities
          </p>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Product</h4>
            <div className="flex flex-col gap-1">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-white"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-muted-foreground hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="/explore"
                className="text-sm text-muted-foreground hover:text-white"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Company</h4>
            <div className="flex flex-col gap-1">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-white"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="https://facebook.com/jhiadle"
            className="text-sm text-muted-foreground hover:text-white"
          >
            Facebook
          </Link>
          <Link
            href="https://twitter.com/jhiadle"
            className="text-sm text-muted-foreground hover:text-white"
          >
            Twitter
          </Link>
          <Link
            href="https://instagram.com/jhiadle"
            className="text-sm text-muted-foreground hover:text-white"
          >
            Instagram
          </Link>
          <Link
            href="https://linkedin.com/company/jhiadle"
            className="text-sm text-muted-foreground hover:text-white"
          >
            LinkedIn
          </Link>
          <Link
            href="https://youtube.com/jhiadle"
            className="text-sm text-muted-foreground hover:text-white"
          >
            YouTube
          </Link>
        </div>
      </div>
    </footer>
  )
}
