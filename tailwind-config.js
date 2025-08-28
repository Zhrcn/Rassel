(function () {
  var config = {
    darkMode: 'class',
    theme: {
      extend: {
        container: { center: true, padding: '1rem' },
        colors: {
          primary: 'var(--color-primary)',
          accent: 'var(--color-accent)',
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          white: 'var(--color-white)'
        },
        fontFamily: {
          sans: ['Poppins', 'ui-sans-serif', 'system-ui']
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(24px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          },
          fadeInDown: {
            '0%': { opacity: '0', transform: 'translateY(-24px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' }
          }
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.6s ease-out both',
          'fade-in-down': 'fadeInDown 0.6s ease-out both',
          'float': 'float 6s ease-in-out infinite'
        },
        boxShadow: {
          soft: '0 10px 30px rgba(0,0,0,0.08)',
          ring: '0 0 0 1px rgba(0,0,0,0.06), 0 10px 30px rgba(0,0,0,0.08)'
        },
        borderRadius: {
          lgx: '18px'
        }
      }
    }
  };
  window.tailwind = window.tailwind || {};
  window.tailwind.config = config;
  try { tailwind.config = config; } catch (e) {}
})();


