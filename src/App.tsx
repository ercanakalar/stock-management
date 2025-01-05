import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/loader/Loader';
import { Main } from './pages/main/Main';
import { Header } from './features/header/Header';
import CreateProductPage from './pages/product/CreateProductPage';
import UpdateProductPage from './pages/product/UpdateProductPage';

function App() {
  const ProductPage = lazy(() => import('./pages/product/ProductPage'));

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header>
          <Main>
            <Routes>
              <Route path='/' element={<ProductPage />} />
              <Route path='/create-product' element={<CreateProductPage />} />
              <Route path='/edit/:id' element={<UpdateProductPage />} />
            </Routes>
          </Main>
        </Header>
      </Suspense>
    </Router>
  );
}

export default App;
