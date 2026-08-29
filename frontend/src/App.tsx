
import { Routes, Route } from 'react-router-dom'

import Hero from './components/Hero/Hero'
import Categories from './components/Categories/Categories'
import FeaturedProducts from './components/Products/FeaturedProducts'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Products from './pages/Products/Products'
import NotFound from './pages/NotFound/NotFound'
import SiteLayout from './components/Layout/SiteLayout/SiteLayout'

import Contact from './components/Contact/Contact'


function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Contact />
    </>
  )
}


function App() {
  return (
    <Routes>

      <Route element={<SiteLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:slug"
          element={<ProductDetails />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  )
}

export default App
