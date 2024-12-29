import LandingPageNavbar from "./_components/navbar"
import { Footer } from "./_components/footer"

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col container relative min-h-screen">
      <LandingPageNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default LandingPageLayout
