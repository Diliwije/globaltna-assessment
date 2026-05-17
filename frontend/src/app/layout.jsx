import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

// Global application metadata configuration
export const metadata = {
  title: 'GlobalTNA Service Board',
  description: 'Assessment project for GlobalTNA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Global context provider to handle user login and JWT state */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}