import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloatingButton from './components/layout/WhatsAppFloatingButton';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const CatalogPage = React.lazy(() => import('./pages/CatalogPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

function AppLayout() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="loading">{t('common.loading')}</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}
