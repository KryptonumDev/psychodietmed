import React from 'react';
import styles from './styles.module.scss';
import HeroMethod from './sections/HeroMethod';
import IntroductionSection from './sections/IntroductionSection';
import ProcessSection from './sections/ProcessSection';
import TargetAudienceSection from './sections/TargetAudienceSection';
import MethodAccordion from '@/components/sections/method-accordion';
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
    introduction,
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

      {/* 2. Introduction - centered text */}
      {introduction && (
        <IntroductionSection data={introduction} theme={theme} />
      )}

      {/* 3. Process - image left, items list + CTA right */}
      {process && (
        <ProcessSection data={process} theme={theme} />
      )}

      {/* 4. Target Audience - heading, text, colorful tiles */}
      {targetAudience && (
        <TargetAudienceSection data={targetAudience} theme={theme} />
      )}

      {/* 5. Accordion - expandable content sections */}
      {accordion?.items?.length > 0 && (
        <MethodAccordion data={accordion} theme={theme} />
      )}

      {/* 6. Features - 2x2 tiles left, heading/text/CTA right */}
      {features && (
        <FeaturesGrid data={features} theme={theme} />
      )}

      {/* 6. Founder - team-owner style card */}
      {founderSection && (
        <FounderSection data={founderSection} theme={theme} />
      )}

      {/* 7. Benefits Tiles - team-flowers style 8 tiles + CTA */}
      {benefitsTiles?.items?.length > 0 && (
        <BenefitsTiles data={benefitsTiles} theme={theme} />
      )}

      {/* 8. Specialists Carousel (optional) */}
      {showSpecialistsCarousel && specialists?.length > 0 && (
        <SpecialistsSection 
          title={specialistsSectionTitle || 'Poznaj naszych specjalistów'} 
          specialists={specialists}
          theme={theme}
        />
      )}

      {/* 9. Final CTA */}
      {ctaSection && (
        <CtaSection data={ctaSection} theme={theme} />
      )}
    </main>
  );
}
