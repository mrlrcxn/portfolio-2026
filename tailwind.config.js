/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Primitive palette ───────────────────────────────────── */
        coal: {
          0: 'var(--coal-0)',
          1: 'var(--coal-1)',
          2: 'var(--coal-2)',
          3: 'var(--coal-3)',
          4: 'var(--coal-4)',
          5: 'var(--coal-5)',
          6: 'var(--coal-6)',
          7: 'var(--coal-7)',
          8: 'var(--coal-8)',
          9: 'var(--coal-9)',
        },
        /* ── Semantic text tokens — DEFAULT ─────────────────────── */
        'default-accent':   'var(--text-default-accent)',
        'default-medium':   'var(--text-default-medium)',
        'default-subtle':   'var(--text-default-subtle)',
        'default-disabled': 'var(--text-default-disabled)',
        /* ── Semantic text tokens — ON-DARK ─────────────────────── */
        'ondark-accent':  'var(--text-ondark-accent)',
        'ondark-medium':  'var(--text-ondark-medium)',
        'ondark-minimal': 'var(--text-ondark-minimal)',
        /* ── Global semantic tokens ──────────────────────────────── */
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        accent:       'var(--color-accent)',
        'accent-soft':'var(--color-accent-soft)',
        text:         'var(--color-text)',
        muted:        'var(--color-muted)',
        border:       'var(--color-border)',
        available:    '#22c55e',
      },
      fontFamily: {
        ui:   ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"',       'system-ui', 'sans-serif'],
        mono: ['"Space Mono"',    'monospace'],
      },
      fontSize: {
        sm: ['12px', { lineHeight: '1.5'  }],
        md: ['16px', { lineHeight: '1.75' }],
        h4: ['20px', { lineHeight: '1.2'  }],
        h3: ['24px', { lineHeight: '1.2'  }],
        h2: ['32px', { lineHeight: '1.2'  }],
        h1: ['40px', { lineHeight: '1.2'  }],
      },
      borderRadius: {
        card:   '20px',
        avatar: '16px',
        tag:    '8px',
        pill:   '9999px',
      },
      boxShadow: {
        card:         '0 2px 32px rgba(28,26,23,0.05)',
        'card-hover': '0 16px 48px rgba(82,3,196,0.1)',
        polaroid:     '4px 8px 32px rgba(28,26,23,0.18), 0 2px 8px rgba(28,26,23,0.1)',
        avatar:       '0 8px 32px rgba(28,26,23,0.14), 0 2px 8px rgba(28,26,23,0.08)',
        'accent-sm':  '0 4px 16px rgba(82,3,196,0.1)',
        'accent-md':  '0 4px 20px rgba(82,3,196,0.28)',
      },
      letterSpacing: {
        tight: '-0.03em',
        snug:  '-0.02em',
        wide:  '0.04em',
        label: '0.06em',
        tag:   '0.1em',
        meta:  '0.2em',
      },
      height: {
        nav: '60px',
      },
      zIndex: {
        nav: '200',
      },
    },
  },
  plugins: [],
}
