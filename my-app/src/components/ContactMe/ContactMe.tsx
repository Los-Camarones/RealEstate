import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export default function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("phone, email, address")
        .single();

      if (error) {
        console.error("Error fetching contact info:", error.message);
      } else {
        setContactInfo(data as ContactInfo);
      }

      setLoading(false);
    };

    fetchContactInfo();
  }, []);

  if (loading) return <p>Loading...</p>;

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
            src="/lourdes-removebg-preview.png"
            alt="Profile Picture"
            className="rounded-full h-20 w-20 object-cover"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-semibold mb-4">Contact Me</h1>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-left">Phone Number</h2>
            <p className="text-blue-600 hover:underline">
              <a href={`tel:${contactInfo?.phone}`}>{contactInfo?.phone}</a>
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-left">Email</h2>
            <p className="text-blue-600 hover:underline">
              <a href={`mailto:${contactInfo?.email}`}>{contactInfo?.email}</a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-left">Address</h2>
            <p className="mb-2 text-blue-600 hover:underline">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo?.address || '')}`} target="_blank" rel="noopener noreferrer">
                {contactInfo?.address.split(',').map((line, index) => (
                  <span key={index}>
                    {line.trim()}
                    <br />
                  </span>
                ))}
              </a>
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 ml-4 hidden sm:block">
          <a href={`tel:${contactInfo?.phone}`} className="block">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
              Contact Me
            </button>
          </a>
        </div>
      </div>

      <div className="pl-20">
        <Link href="/">
          <img className='w-3/4 h-auto' src="/logo_.png" alt="Lourdes logo" />
        </Link>
      </div>
    </div>
  );
}
