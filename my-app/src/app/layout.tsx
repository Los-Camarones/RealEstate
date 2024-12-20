import { Analytics } from "@vercel/analytics/react"

import { AuthProvider } from "@/app/context/AuthContext";

export const metadata = {
  title: 'Lourdes Mendoza | Real Estate', 
  description: 'Explore expert real estate services in the Sacramento area. Discover homes for sale, community information, and property listings tailored to your needs. Find your dream home today!',
};

// Wrapping the page component with the RootLayout to ensur they are displayed within a consistent layout
export default function RootLayout({
  // The children prop represents the content that will be displayed within the layout
  children,
}: {
  // The children prop is a ReactNode, that will hold the content of the pages wrapped by this layout
  children: React.ReactNode;
}) {
  // Fetch the activation token from environment variables
  // The activation token is used to authenticate the IDX integration
  // Next_public_ prefix is used to expose the environment variable to the client-side
  const activationToken = process.env.NEXT_PUBLIC_IDX_ACTIVATION_TOKEN; // Fetch the activation token from environment variables

  return (
    <html lang="en">
      <head>
        {/* Include the IDX script and configuration */}
        <script src="https://kestrel.idxhome.com/ihf-kestrel.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ihfKestrel = window.ihfKestrel || {};
              ihfKestrel.config = {
                platform: "custom",
                activationToken: "${activationToken}", // Use the activation token from the environment variable
              };
            `,
          }}
        />
      </head>
      <body>
      
        <AuthProvider>
          {children}
          </AuthProvider>
       
      <Analytics />
      </body>
    </html>
  );
}
