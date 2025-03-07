import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Layout({children}) {
  return (
    <div>
      <Navbar/>
      <main className="p-6 min-h-screen">{children}</main>
      <Footer/>
    </div>
  )
}
