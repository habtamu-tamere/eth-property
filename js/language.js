// Language translations
const translations = {
    en: {
        home: "Home",
        listings: "Listings",
        agents: "Agents",
        about: "About",
        contact: "Contact",
        post_property: "Post Property",
        login: "Login",
        register: "Register Early",
        hero_title: "Find Your Dream Home in Ethiopia",
        hero_subtitle: "Browse thousands of properties for sale and rent across Addis Ababa and major cities",
        search_placeholder: "City, Neighborhood, or Address",
        property_type: "Property Type",
        search: "Search",
        buy: "Buy",
        rent: "Rent",
        featured_properties: "Featured Properties",
        view_all: "View All",
        how_it_works: "How It Works",
        step1_title: "Create an Account",
        step1_desc: "Register as a buyer, renter, seller, or agent",
        step2_title: "Find or List Properties",
        step2_desc: "Browse properties or create your own listing",
        step3_title: "Connect & Close",
        step3_desc: "Message directly and complete your transaction",
        popular_locations: "Popular Locations",
        addis_ababa: "Addis Ababa",
        addis_properties: "1,240 Properties",
        cta_title: "Ready to Find Your Dream Home?",
        cta_subtitle: "Join thousands of satisfied users who found their perfect property with us",
        get_started: "Get Started",
        browse_listings: "Browse Listings",
        quick_links: "Quick Links",
        property_types: "Property Types",
        apartments: "Apartments",
        houses: "Houses",
        villas: "Villas",
        commercial: "Commercial",
        land: "Land",
        contact_us: "Contact Us",
        address: "Bole, Addis Ababa, Ethiopia",
        copyright: "© 2025 PropertyPro. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        faq: "FAQ"
    },
    am: {
        home: "መነሻ",
        listings: "ዝርዝሮች",
        agents: "ደላሎች",
        about: "ስለኛ",
        contact: "አግኙን",
        login: "ግባ",
        register: "ቀድመው ይመዝገቡ",
        hero_title: "የህልምዎን ቤት በኢትዮጵያ ያግኙ",
        hero_subtitle: "በአዲስ አበባ እና በሌሎች ዋና ከተሞች የሚገኙ በሺዎች የሚቆጠሩ ንብረቶችን ያማርጥ",
        search_placeholder: "ከተማ፣ አካባቢ ወይም አድራሻ",
        property_type: "የንብረት አይነት",
        search: "ፈልግ",
        buy: "ግዢ",
        rent: "ኪራይ",
        featured_properties: "የተለዩ ንብረቶች",
        view_all: "ሁሉንም ይመልከቱ",
        how_it_works: "እንዴት እንደሚሰራ",
        step1_title: "መለያ ይፍጠሩ",
        step1_desc: "እንደ ገዢ፣ ኪራይ አካል፣ ሻጭ ወይም አገልጋይ ይመዝገቡ",
        step2_title: "ንብረቶችን ያግኙ ወይም ዝርዝር",
        step2_desc: "ንብረቶችን ይመልከቱ ወይም የራስዎን ዝርዝር ይፍጠሩ",
        step3_title: "ያገናኙ እና ይጨርሱ",
        step3_desc: "በቀጥታ ይጻፉ እና ግብይትዎን ይጨርሱ",
        popular_locations: "ታዋቂ ቦታዎች",
        addis_ababa: "አዲስ አበባ",
        addis_properties: "1,240 ንብረቶች",
        cta_title: "የህልምዎን ቤት ለማግኘት ዝግጁ ነዎት?",
        cta_subtitle: "በእኛ ጋር ፍጹም ንብረታቸውን ያገኙ በሺዎች የሚቆጠሩ እርካታ ያላቸው ተጠቃሚዎች ይቀላቀሉ",
        get_started: "ጀምር",
        browse_listings: "ዝርዝሮችን ይመልከቱ",
        post_property: "ንብረት ለመለጠፍ",
        quick_links: "ፈጣን አገናኞች",
        property_types: "የንብረት አይነቶች",
        apartments: "አፓርታማዎች",
        houses: "ቤቶች",
        villas: "ቪላዎች",
        commercial: "ኮሜርሻል",
        land: "መሬት",
        contact_us: "አግኙን",
        address: "ቦሌ፣ አዲስ አበባ፣ ኢትዮጵያ",
        copyright: "© 2025 ፕሮፐርቲፕሮ. ሁሉም መብቶች የተጠበቁ ናቸው።",
        privacy: "የግላዊነት ፖሊሲ",
        terms: "የአገልግሎት ውሎች",
        faq: "ተደጋጋሚ ጥያቄዎች"
    },
    om: {
        home: "Mana",
        listings: "Galmee",
        agents: "Hojjettoota",
        about: "Waa'ee",
        contact: "Nu qunnamtii",
        login: "Seeni",
        register: "Galmaa'aa",
        hero_title: "Mana Jaalalaa kee Ethiopia keessatti argadhu",
        hero_title: "Mana jaalalaa kee Itoophiyaa keessatti argadhu",
        hero_subtitle: "Baadiyyaa fi magaalaa guddoo keessatti gurguramaa fi kiraa ta'an hedduu ilaali",
        search_placeholder: "Magaalaa, Naannoo, ykn Teessoo",
        property_type: "Gosa Qabeenyaa",
        search: "Barbaadi",
        buy: "Bitadhu",
        rent: "Kira",
        featured_properties: "Qabeenyawwan Mul'atan",
        view_all: "Hunda Ilalli",
        how_it_works: "Akkaataa itti hojjetu",
        step1_title: "Akkaawuntii Uumu",
        step1_desc: "Akka bitattii, kirattii, gurgurtii ykn hojjettootti galmaa'aa",
        step2_title: "Qabeenya Argadhu ykn Galmeessi",
        step2_desc: "Qabeenya ilaali ykn galmee kee ofii uumu",
        step3_title: "Walqunnamtii Mirkaneessi",
        step3_desc: "Ergaa dhaamsa kennuun walitti mirkaneessu",
        popular_locations: "Bakkeetaan Beekamoo",
        addis_ababa: "Finfinnee",
        addis_properties: "Qabeenya 1,240",
        cta_title: "Mana Jaalalaa kee Argachuuf Qophaa'aa?",
        cta_subtitle: "Nu waliin qabeenya isaanii argatan dhumarratti gammachuun walitti makaman",
        get_started: "Eegaluu",
        browse_listings: "Galmee Ilalli",
        quick_links: "Kuufamtoota Dafanii",
        property_types: "Gosa Qabeenyaa",
        apartments: "Apartmaanti",
        houses: "Mana",
        villas: "Villa",
        commercial: "Daldalaa",
        post_property: "Qabeenya Dhiheessuu",
        land: "Lafa",
        contact_us: "Nu Qunnamtii",
        address: "Bolee, Finfinnee, Itoophiyaa",
        copyright: "© 2025 PropertyPro. Mirgi hundi kan isaati.",
        privacy: "Ilaalcha Dhugaa",
        terms: "Haala Tajaajilaa",
        faq: "Gaaffiiwwan Dabalataa"
    }
};

// Language switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    const langSwitcher = document.querySelector('.language-switcher');
    const langButtons = langSwitcher.querySelectorAll('button');
    const html = document.documentElement;
    
    // Set initial language
    const savedLang = localStorage.getItem('lang') || 'en';
    html.setAttribute('data-lang', savedLang);
    updateText(savedLang);
    
    // Highlight current language button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        }
    });
    
    // Language switcher
    langSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const lang = e.target.dataset.lang;
            html.setAttribute('data-lang', lang);
            localStorage.setItem('lang', lang);
            updateText(lang);
            
            // Update active button
            langButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.lang === lang) {
                    btn.classList.add('active');
                }
            });
        }
    });
    
    // Update all text elements
    function updateText(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        // Update placeholders
        const placeholders = document.querySelectorAll('[data-i18n-ph]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });
    }
});