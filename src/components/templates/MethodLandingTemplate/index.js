import React from 'react';
import styles from './styles.module.scss';
import HeroMethod from './sections/HeroMethod';
import ProcessSection from './sections/ProcessSection';
import TargetAudienceSection from './sections/TargetAudienceSection';
import FeaturesGrid from './sections/FeaturesGrid';
import FounderSection from './sections/FounderSection';
import BenefitsTiles from './sections/BenefitsTiles';
import SpecialistsSection from './sections/SpecialistsSection';
import CtaSection from './sections/CtaSection';
import Breadcrumbs from '@/components/sections/breadcrumbs';

/**
 * MethodLandingTemplate - Reusable template for PDW/PDR landing pages
 * @param {Object} data - GraphQL data for the page
 * @param {string} theme - 'pdw' or 'pdr' for color theming
 * @param {string} slug - Page slug for breadcrumbs
 * @param {Array} specialists - Array of specialist data for carousel (optional)
 */
export default function MethodLandingTemplate({ data, theme = 'pdw', slug, specialists = [] }) {
  const {
    methodName,
    hero,
    process,
    targetAudience,
    accordion,
    features,
    founderSection,
    benefitsTiles,
    showSpecialistsCarousel,
    specialistsSectionTitle,
    ctaSection,
  } = data || {};

  const themeClass = theme === 'pdr' ? styles.themePdr : styles.themePdw;

  return (
    <main className={`${styles.wrapper} ${themeClass}`} id="main">
      <Breadcrumbs
        data={[
          { page: methodName || 'Metoda', url: `/${slug}` },
        ]}
      />
      
      {/* 1. Hero with specialist card */}
      {hero && (
        <HeroMethod data={hero} theme={theme} methodName={methodName} />
      )}

      {/* 2. Process + Accordion - 2 columns: Image left, Accordion right */}
      {(process || accordion?.items?.length > 0) && (
        <ProcessSection data={process} accordion={accordion} theme={theme} />
      )}

      {/* 3. Target Audience - heading, text, colorful tiles */}
      {targetAudience && (
        <TargetAudienceSection data={targetAudience} theme={theme} />
      )}

      {/* 4. Features - 2 columns: Text left, 2x2 tiles right (zig-zag pattern) */}
      {features && (
        <FeaturesGrid data={features} theme={theme} />
      )}

      {/* 5. Founder - team-owner style card */}
      {founderSection && (
        <FounderSection data={founderSection} theme={theme} />
      )}

      {/* 6. Benefits Tiles - team-flowers style 8 tiles + CTA */}
      {benefitsTiles?.items?.length > 0 && (
        <BenefitsTiles data={benefitsTiles} theme={theme} />
      )}

      {/* 7. Specialists Carousel (optional) */}
      {showSpecialistsCarousel && specialists?.length > 0 && (
        <SpecialistsSection 
          title={specialistsSectionTitle || 'Poznaj naszych specjalistów'} 
          specialists={specialists}
          theme={theme}
        />
      )}

      {/* 8. Final CTA */}
      {ctaSection && (
        <CtaSection data={ctaSection} theme={theme} />
      )}
    </main>
  );
}
