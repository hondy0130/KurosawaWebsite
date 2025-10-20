import Hero from './components/Hero';
import Achievement from './components/Achievement';
import Services from './components/Services';
import CompanyOverview from './components/CompanyOverview';
import News from './components/News';
import Articles from './components/Articles';
import Contact from './components/Contact';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <News />
        <Achievement />
        <Services />
        <CompanyOverview />
        <Articles />
        <Contact />
        <FAQ />
      </main>
    </div>
  );
}
