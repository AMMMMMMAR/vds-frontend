/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#081425',
          lowest: '#040e1f',
          low: '#111c2d',
          container: '#152031',
          high: '#1f2a3c',
          highest: '#2a3548',
          variant: '#2a3548',
          bright: '#2f3a4c',
          dim: '#081425',
          tint: '#adc6ff',
        },
        primary: {
          DEFAULT: '#adc6ff',
          container: '#4d8eff',
          fixed: '#d8e2ff',
          'fixed-dim': '#adc6ff',
        },
        secondary: {
          DEFAULT: '#b7c8e1',
          container: '#3a4a5f',
        },
        tertiary: {
          DEFAULT: '#ffb786',
          container: '#df7412',
        },
        outline: {
          DEFAULT: '#8c909f',
          variant: '#424754',
        },
        on: {
          surface: '#d8e3fb',
          'surface-variant': '#c2c6d6',
          primary: '#002e6a',
          secondary: '#213145',
        },
        error: '#ffb4ab',
        background: '#081425',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4d8eff 0%, #adc6ff 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23adc6ff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'ambient-blue': '0 0 60px -5px rgba(173, 198, 255, 0.08)',
        'ambient-blue-lg': '0 0 120px -10px rgba(173, 198, 255, 0.12)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(173,198,255,0.1)',
      },
      backdropBlur: {
        xs: '4px',
      },
      letterSpacing: {
        widest: '0.2em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 2.5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(173,198,255,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(173,198,255,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
