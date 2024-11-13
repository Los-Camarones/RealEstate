"use client";

import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './ContactMe.module.css';
import { createClient } from "@supabase/supabase-js";
import IHomeFinderContactWidget from "../../components/iHomeFinderContactWidget/iHomeFinderContactWidget";

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
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

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

  const toggleWidget = () => {
    setIsWidgetOpen(!isWidgetOpen);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact information page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.card}>
        <img
          src="/lourdes-removebg-preview.png"
          alt="Profile Picture"
          className={styles.profilePic}
        />

        <h1 className={styles.title}>Contact Me</h1>

        <div className={styles.info}>
          <h2>Phone Number</h2>
          <p>
            <center>
            <a href={`tel:${contactInfo?.phone}`}>{contactInfo?.phone}</a>
              </center>
          </p>
        </div>

        <div className={styles.info}>
          <h2>Email</h2>
          <p>
            <center>
            <a href={`mailto:${contactInfo?.email}`}>{contactInfo?.email}</a>
            </center>
          </p>
        </div>

        <div className={styles.info}>
          <h2>Big Block Realty North</h2>
          <p>
            <center>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo?.address || '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contactInfo?.address}
            </a>
            </center>
            <br />
            <center>CA DRE# 01527343</center>
          </p>
        </div>

        <button onClick={toggleWidget} className={styles.contactButton}>
          {isWidgetOpen ? "Hide Contact Form" : "Contact Me"}
        </button>

        {isWidgetOpen && (
          <div className={styles.dropdownWidget}>
            <IHomeFinderContactWidget />
          </div>
        )}
      </div>

      <Link href="/">
        <img className={styles.logo} src="/logo_.png" alt="Lourdes logo" />
      </Link>
    </div>
  );
}
