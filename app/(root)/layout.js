import Header from "@/components/Header"

const Layout = ({children}) => {
  return (
    <main>
        <Header/>
      <div className="container py-10">
        {children}
      </div>
    </main>
  )
}

export default Layout
