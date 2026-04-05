/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/5-umiejetnosci-ktorych-powinien-nauczyc-dietetyk',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/author/monika-jurecka',
        destination: '/blog',
        permanent: true
      },
      { 
        source: '/author/sylwia', 
        destination: '/blog', 
        permanent: true 
      },
      { 
        source: '/brak-dostepu', 
        destination: '/', 
        permanent: true 
      },
      {
        source: '/czy-jedzenie-intuicyjne-jest-dla-kazdego',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/czy-nocne-podjadanie-jest-szkodliwe',
        destination: '/media/czy-nocne-podjadanie-jest-szkodliwe',
        permanent: true
      },
      {
        source: '/dlaczego-w-odchudzaniu-bardziej-licza-sie-umiejetnosci-niz-dieta',
        destination: '/blog',
        permanent: true
      },
      { 
        source: '/do-pobrania', 
        destination: '/', 
        permanent: true 
      },
      {
        source: '/dzien-dobry-tvn',
        destination: '/media/dzien-dobry-tvn',
        permanent: true
      },
      {
        source: '/eksperymenty-w-gabinecie-dietetyka',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/emocje-utrudniaja-schudniecie',
        destination: '/blog',
        permanent: true
      },
      { 
        source: '/home', 
        destination: '/', 
        permanent: true 
      },
      {
        source: '/jak-nauczyc-pacjentow-odmawiac-innym',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/jak-odkryc-w-sobie-chec-i-motywacje-do-regularnej-aktywnosci-fizycznej',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/jak-odkrywac-motywacje-pacjenta',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/jak-pomoc-pacjentom-w-tym-aby-nie-porzucili-diety',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/jak-przekonania-o-emocjach-utrudniaja-schudniecie',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/jak-zwiekszac-motywacje-pacjentow-w-czasie-odchudzania',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/komu-pomoze-psychodietetyk',
        destination: '/media/komu-pomoze-psychodietetyk',
        permanent: true
      },
      {
        source: '/konflikt-wewnetrzny-pacjenta',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/lista-znieksztalcen-myslenia',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/lp',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/lp/webinar-jak-zwiekszyc-zyski-gabinetu-dietetycznego-bez-wielkich-inwestycji',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/lp/webinar-kiedy-odchudzanie-szkodzi',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/lp/webinar-kiedy-odchudzanie-szkodzi/dziekuje-po-web',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/lp/webinar-kiedy-odchudzanie-szkodzi/nagranie',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/motywacja-pacjenta-dietetyk',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/motywacja-pacjenta-do-aktywnosci-fizycznej',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/mysl-i-chudnij',
        destination: '/media/mysl-i-chudnij',
        permanent: true
      },
      {
        source: '/najskuteczniejsze-narzedzie-w-pracy-dietetyka-i-psychodietetyka',
        destination: '/akademia/rozszerzony-wywiad-psychodietetyczny',
        permanent: true
      },
      {
        source: '/pacjenci-beda-odchodzic-jesli-tego-nie-sprawdzisz',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/page/2',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/page/3',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/page/4',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/page/5',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/page/6',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/pobierz',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/pobierz/bledy-dietetyka-przez-ktore-pacjenci-odchodza',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/pobierz/wywiad-psychodietetyczny',
        destination: '/akademia/rozszerzony-wywiad-psychodietetyczny',
        permanent: true
      },
      {
        source: '/problem-wagi-ciezkiej',
        destination: '/media/artykul-wprost-problem-wagi-ciezkiej',
        permanent: true
      },
      {
        source: '/rozmowy-w-toku',
        destination: '/media/rozmowy-w-toku',
        permanent: true
      },
      { 
        source: '/sklep', 
        destination: '/oferta',
        permanent: true 
      },
      {
        source: '/sklep/ebooki',
        destination: '/akademia',
        permanent: true
      },
      {
        source: '/sklep/ebooki/rozszerzony-wywiad-psychodietetyczny',
        destination: '/akademia/rozszerzony-wywiad-psychodietetyczny',
        permanent: true
      },
      {
        source: '/sklep/ebooki/rozszerzony-wywiad-psychodietetyczny-promo',
        destination: '/akademia/rozszerzony-wywiad-psychodietetyczny',
        permanent: true
      },
      {
        source: '/sklep/kursy',
        destination: '/akademia',
        permanent: true
      },
      {
        source: '/sklep/kursy/zatrzymaj-pacjenta-zanim-zrezygnuje',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/sklep/kursy/zatrzymaj-pacjenta-zanim-zrezygnuje-promo',
        destination: '/akademia/kurs/zatrzymaj-pacjenta-zanim-zrezygnuje',
        permanent: true
      },
      {
        source: '/sklep/szkolenia-online',
        destination: '/akademia',
        permanent: true
      },
      {
        source: '/sklep/szkolenia-online/kiedy-odchudzanie-szkodzi',
        destination: '/akademia',
        permanent: true
      },
      {
        source: '/sklep/warsztaty',
        destination: '/akademia',
        permanent: true
      },
      {
        source: '/sklep/warsztaty/skuteczna-sprzedaz-uslug-dietetycznych',
        destination: '/akademia',
        permanent: true
      },
      {
        source: '/stres-na-widelcu',
        destination: '/media/stres-na-widelcu',
        permanent: true
      },
      {
        source: '/temat/bez-kategorii',
        destination: '/blog',
        permanent: true
      },
      { 
        source: '/temat/blog', 
        destination: '/blog', 
        permanent: true 
      },
      {
        source: '/temat/blog/page/2',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/temat/blog/page/3',
        destination: '/blog',
        permanent: true
      },
      { 
        source: '/temat/media', 
        destination: '/media', 
        permanent: true 
      },
      { 
        source: '/temp', 
        destination: '/', 
        permanent: true 
      },
      {
        source: '/wejdz-w-buty-pacjenta',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/wilczy-glod-gluten-party-i-wyrzuty-sumienia',
        destination: '/media/wilczy-glod-gluten-party-i-wyrzuty-sumienia',
        permanent: true
      },
      {
        source: '/znacznik/codzienne-wazenie-sie',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/znacznik/czego-powinien-nauczyc-dietetyk',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/dieta',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/dietetyk',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/dietetyka',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/efekty-diety',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/eksperymenty-dietetyka',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/emocje-a-schudniecie',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/jedynie-emocjonalne',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/kalorie',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/komunikacja',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/konflikt-wewnetrzny-pacjenta',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/mocne-strony',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/motywacja',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/motywacja-pacjenta-dietetycznego',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/motywacja-pacjenta-do-aktywnosci-fizycznej',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/motywacja-pacjenta-do-aktywnosci-treningu',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/motywacja-pacjenta-do-cwiczen',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/motywacja-pacjenta-do-sportu',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/narzedzia',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/odchudzanie',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/powody-do-dzialania',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/praca-dietetyka',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/psychologia',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/skuteczny-dietetyk',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/ubior',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/umiejetnosci',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/waga',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/wazenie-sie',
        destination: '/blog?kategoria=dietetyka',
        permanent: true
      },
      {
        source: '/znacznik/wiara-w-siebie',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/wspolpraca',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znacznik/wytrwalosc-w-odchudzaniu',
        destination: '/blog?kategoria=psychodietetyka',
        permanent: true
      },
      {
        source: '/znajdz-klucz-do-sukcesu',
        destination: '/media/znajdz-klucz-do-sukcesu',
        permanent: true
      },
    ]
  },
  experimental: {
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.psychodietmed.pl',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
