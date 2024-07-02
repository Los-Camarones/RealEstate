
import Head from 'next/head';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center lg:flex-row lg:p-4">
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact information page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg flex">
        <div className="flex-shrink-0 mr-4">
          <img
            src="/lourdes-removebg-preview.png"  // Replace with your image URL
            alt="Profile Picture"
            className="rounded-full h-20 w-20 object-cover"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-semibold mb-4">Contact Me</h1>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Phone Number</h2>
            <p className="text-blue-600 hover:underline">
              <a href="tel:+19165160007">+1 (916) 516-0007</a>
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-blue-600 hover:underline">
              <a href="mailto:lourdesmendoza1@yahoo.com">lourdesmendoza1@yahoo.com</a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Address
            </h2>
            <p className="mb-2 text-blue-600 hover:underline">
              <a href="https://maps.app.goo.gl/h3ncb3T19BGEG7wy5">
                Big Block Realty North <br className='br-style'></br> {/*for end lines */}
                550 Howe Avenue, Suite 200 <br className='br-style'></br>
                Sacramento, CA 95825
              </a> 
            </p>


          </div>
        </div>

        <div className="flex-shrink-0 ml-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            <a href="tel:+19165160007">Contact Me</a>
          </button>
        </div>
      </div>

      <div className='m-4'>
        {/*Lourdes logo */}
        <Link href="/">
          <img src="/logo_.png" alt="Lourdes logo" />
        </Link>
      </div>
    </div>
  );
}
