document.addEventListener('DOMContentLoaded', () => {

    // --- URL PARAMETER & TRACKING LOGIC ---

    /**
     * Captures URL query parameters and saves them to sessionStorage.
     * sessionStorage is used to keep tracking data only for the current session.
     */
    const captureUrlParams = () => {
        const params = new URLSearchParams(window.location.search);
        if (params.toString()) {
            sessionStorage.setItem('trackingParams', params.toString());
        }
    };

    /**
     * Appends stored tracking parameters to all Call-to-Action links.
     */
    const updateCtaLinks = () => {
        const storedParams = sessionStorage.getItem('trackingParams');
        if (!storedParams) return;

        document.querySelectorAll('.cta-link').forEach(link => {
            const originalHref = link.href;
            const separator = originalHref.includes('?') ? '&' : '?';
            // Ensure we don't add params to a link that isn't a page link
            if (originalHref.startsWith('http') || originalHref.startsWith('#')) {
                 // Handles both full URLs and hash links gracefully
                 const [base, hash] = originalHref.split('#');
                 let newHref = base + separator + storedParams;
                 if(hash) {
                    newHref += '#' + hash;
                 }
                 link.href = newHref;
            }
        });
    };
    
    // --- TRANSLATION LOGIC ---

    const translations = {
        en: {
            navHome: "Home",
            navProducts: "Products",
            navAbout: "About Us",
            navContact: "Order",
            heroTitle: "Experience Pure Tanzanian Quality",
            heroSubtitle: "Every product is our promise of excellence to you.",
            shopNow: "Shop Now",
            productsTitle: "Discover Our Premium Products",
            productGinDesc: "Crisp. Aromatic. Unforgettable. Your new signature spirit.",
            productOilDesc: "Pure sunshine in a bottle. Healthy and delicious for your family's meals.",
            productSoapDesc: "Nourish your skin, naturally. Feel fresh and revitalized every day.",
            orderNow: "Order Now",
            aboutTitle: "Our Promise To You",
            aboutText: "Our promise is simple: to bring you the very best of Tanzania's natural bounty, crafted with care and integrity. We are proud to offer products you can trust and enjoy.",
            orderTitle: "Ready to Taste the Difference?",
            orderSubtitle: "Place your order securely through our online system below.",
            embedTitle: "Online Ordering System",
            embedText: "Your ordering system (e.g., iframe from Shopify, Tiktuk, etc.) will be embedded here.",
            footerSlogan: "Quality you can trust.",
            contactTitle: "Contact Us",
            socialTitle: "Follow Us Online",
        },
        sw: {
            navHome: "Mwanzo",
            navProducts: "Bidhaa",
            navAbout: "Kuhusu Sisi",
            navContact: "Agiza",
            heroTitle: "Onja Ubora Halisi wa Tanzania",
            heroSubtitle: "Kila bidhaa ni ahadi yetu ya ubora kwako.",
            shopNow: "Agiza Sasa",
            productsTitle: "Gundua Bidhaa Zetu Bora",
            productGinDesc: "Laini. Inayonukia. Isiyosahaulika. Kinywaji chako maalum.",
            productOilDesc: "Mwanga wa jua kwenye chupa. Safi na bora kwa afya ya familia yako.",
            productSoapDesc: "Lishe ya asili kwa ngozi yako. Jisikie msafi na mchangamfu kila siku.",
            orderNow: "Weka Oda",
            aboutTitle: "Ahadi Yetu Kwako",
            aboutText: "Ahadi yetu ni rahisi: kukuletea kilicho bora zaidi kutoka kwenye utajiri wa asili wa Tanzania, kilichotengenezwa kwa uangalifu na uadilifu. Tunajivunia kukupa bidhaa unazoweza kuziamini na kuzifurahia.",
            orderTitle: "Tayari Kuonja Ubora?",
            orderSubtitle: "Weka oda yako sasa kupitia mfumo wetu salama hapa chini.",
            embedTitle: "Mfumo wa Kuagiza Mtandaoni",
            embedText: "Sehemu hii itakuwa na iframe ya mfumo wako wa kuagiza (k.m. Shopify, Tiktuk, n.k.).",
            footerSlogan: "Ubora unaoweza kuamini.",
            contactTitle: "Wasiliana Nasi",
            socialTitle: "Tufuate Mtandaoni",
        }
    };

    const langEnBtn = document.getElementById('lang-en');
    const langSwBtn = document.getElementById('lang-sw');

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            element.textContent = translations[lang][key] || element.textContent;
        });

        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        if (lang === 'sw') {
            langSwBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        } else {
            langEnBtn.classList.add('active');
            langSwBtn.classList.remove('active');
        }
    };

    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langSwBtn.addEventListener('click', () => setLanguage('sw'));

    // --- MOBILE MENU TOGGLE ---

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- INITIALIZATION ---
    
    // 1. Capture URL params on page load
    captureUrlParams();
    
    // 2. Set language (defaulting to Swahili)
    const savedLang = localStorage.getItem('language') || 'sw';
    setLanguage(savedLang);

    // 3. Update CTA links with any captured params
    updateCtaLinks();
});