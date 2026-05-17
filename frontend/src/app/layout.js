// src/app/layout.js
import './globals.css'

export const metadata = {
  title: 'GlobalTNA Service Board',
  description: 'Assessment project for GlobalTNA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}