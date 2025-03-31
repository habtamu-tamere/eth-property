// document.addEventListener('DOMContentLoaded', function() {
//   const langButtons = document.querySelectorAll('.lang-btn');
//   const englishText = document.querySelector('.english');
//   const amharicText = document.querySelector('.amharic');
//   const oromoText = document.querySelector('.oromo');
  
//   // Sample content for different banners (you can expand this)
//   const bannerContents = [
//       {
//           en: "Affordable Luxury Homes in Addis Ababa!",
//           am: "በተመጣጣኝ ዋጋ የሚገኝ ልዩ ቤት አዲስ አበባ!",
//           om: "Mana qulqulluu gatii mirkaneeffataa Addis Ababaa!"
//       },
//       {
//           en: "Land for Sale - Prime Location Near Bole!",
//           am: "መሬት ለመሸጥ - ከቦሌ አቅራቢያ ምርጥ ቦታ!",
//           om: "Lafa ijaaruu - iddoo gaarii Bolee irraa!"
//       },
//       {
//           en: "Dream Villa - 30% Down Payment!",
//           am: "የህልም ቪላ - 30% ቅድሚያ ክፍያ!",
//           om: "Villa abjuu - 30% kaffaltii jalqabaa!"
//       }
//   ];
  
//   let currentBanner = 0;
  
//   // Language toggle functionality
//   langButtons.forEach(button => {
//       button.addEventListener('click', function() {
//           langButtons.forEach(btn => btn.classList.remove('active'));
//           this.classList.add('active');
          
//           const lang = this.getAttribute('data-lang');
          
//           // Hide/show languages
//           if(lang === 'en') {
//               englishText.style.display = 'block';
//               amharicText.style.display = 'none';
//               oromoText.style.display = 'none';
//           } else if(lang === 'am') {
//               englishText.style.display = 'none';
//               amharicText.style.display = 'block';
//               oromoText.style.display = 'none';
//           } else if(lang === 'om') {
//               englishText.style.display = 'none';
//               amharicText.style.display = 'none';
//               oromoText.style.display = 'block';
//           }
//       });
//   });
  
//   // Rotate banners every 5 seconds
//   setInterval(() => {
//       currentBanner = (currentBanner + 1) % bannerContents.length;
//       updateBannerContent();
//   }, 5000);
  
//   function updateBannerContent() {
//       englishText.textContent = bannerContents[currentBanner].en;
//       amharicText.textContent = bannerContents[currentBanner].am;
//       oromoText.textContent = bannerContents[currentBanner].om;
//   }
// });














document.addEventListener('DOMContentLoaded', function() {
  const banners = [
      document.getElementById('banner1'),
      document.getElementById('banner2'),
      document.getElementById('banner3'),
      document.getElementById('banner4'),
      document.getElementById('banner5'),
      document.getElementById('banner6'),
      document.getElementById('banner7'),
      document.getElementById('banner8'),
      document.getElementById('banner9'),
      document.getElementById('banner10')
  ];
  
  const dots = document.querySelectorAll('.dot');
  const languageButton = document.getElementById('languageButton');
  let currentBanner = 0;
  let slideInterval;
  
  // Different animation types for variety
  const animationClasses = [
      'slide-right',
      'slide-left',
      'slide-top',
      'slide-bottom',
      'slide-diagonal-tr',
      'slide-diagonal-tl',
      'slide-diagonal-br',
      'slide-diagonal-bl',
      'slide-zoom-out',
      'slide-rotate'
  ];
  
  // Initialize banners
  function initBanners() {
      banners.forEach((banner, index) => {
          if (index !== 0) {
              // Assign random animation class initially
              const randomAnim = animationClasses[Math.floor(Math.random() * animationClasses.length)];
              banner.classList.add(randomAnim);
          }
      });
  }
  
  // Change banner
  function changeBanner(nextIndex) {
      // Get a random animation for this transition
      const animationClass = animationClasses[Math.floor(Math.random() * animationClasses.length)];
      
      // Apply the animation class to the current banner
      banners[currentBanner].classList.add(animationClass);
      
      // Remove all animation classes from the next banner
      animationClasses.forEach(animClass => {
          banners[nextIndex].classList.remove(animClass);
      });
      
      // Update current banner
      currentBanner = nextIndex;
      
      // Update dots
      updateDots();
  }
  
  // Update navigation dots
  function updateDots() {
      dots.forEach((dot, index) => {
          if (index === currentBanner) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }
  
  // Auto slide
  function startAutoSlide() {
      slideInterval = setInterval(() => {
          const nextIndex = (currentBanner + 1) % banners.length;
          changeBanner(nextIndex);
      }, 4000); // Reduced to 4s for 10 banners
  }
  
  // Click on dots
  dots.forEach(dot => {
      dot.addEventListener('click', function() {
          const targetIndex = parseInt(this.getAttribute('data-target'));
          if (targetIndex !== currentBanner) {
              clearInterval(slideInterval);
              changeBanner(targetIndex);
              startAutoSlide();
          }
      });
  });
  
 
  // Initialize
  initBanners();
  startAutoSlide();
});