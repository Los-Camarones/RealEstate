import React from 'react';
import Link from 'next/link';
import styles from './FooterLinks.css';



interface FooterLink {
    label: string;
    href: string;
}

interface FooterCategory {
    title: string;          //Category name (e.g. "Privacy", "About") This is for expanding the link system
    links: FooterLink[];    // URL for the link (e.g., "/privacy")


}

//Props to pass categories to FooterLinks component
interface FooterLinksProps {
    categories: FooterCategory[];
}

// Main  FooterLinks component

const FooterLinks: React.FC<FooterLinksProps> = ({ categories }) => {
    return (
        <div className={styles.gridContainer}>
            {categories.map((category, index) => (
                <div key={index} className={styles.category}>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                    <ul className={styles.linkList}>
                        {category.links.map((link, linkIndex) => (
                            <li key={linkIndex} className={styles.linkItem}>
                                <Link href={link.href} className={styles.link}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default FooterLinks;