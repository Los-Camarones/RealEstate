export const metadata = {
  title: 'Next.js', 
  description: 'Generated by Next.js', 
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
                platform: "",
                activationToken: "${activationToken}", // Use the activation token from the environment variable
              };
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
