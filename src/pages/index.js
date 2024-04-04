// Import necessary libraries and components
import React from 'react';
import clsx from 'clsx'; // A utility for conditionally joining classNames together
import Layout from '@theme/Layout'; // Main layout wrapper provided by Docusaurus
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // Hook to access the site configuration
import styles from './index.module.css'; // Custom styles for this component
import HomepageFeatures from '../components/HomepageFeatures'; // A custom component to show features
import HomePageContent from './HomePage_content.mdx'; // MDX content for the homepage

// Header component for the homepage
function HomepageHeader() {
  // Extract siteConfig from Docusaurus context
  const {siteConfig} = useDocusaurusContext();

  return (
    // Header with combined styles from CSS module and inline styles
    <header className={clsx('hero hero--primary', styles.heroBanner)}
    style={{ backgroundColor: '#6E6E6E' }}>
      <div className="container">
        {/* Display the title and tagline from the site's configuration */}
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        {/* Badge from GitHub for project status */}
        <div style={{ textAlign: 'center' }}>
          <a href="https://github.com/amichai-bd/fpga_mafia/actions/workflows/mafia_level2.yml">
            <img src="https://github.com/amichai-bd/fpga_mafia/actions/workflows/mafia_level2.yml/badge.svg" alt="mafia_level2 badge" />
          </a>
        </div>

        {/* Information on the current development status */}
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div align='left'>
            <h3><strong>Current Development Status:</strong></h3>
            <p>
              This project is currently a work in progress
              <br/> We are in the process of enabling and integrating individual IPs
              <br/> Our team is working diligently to deliver a fully functional fabric by May, 2024.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Main homepage component
export default function Home() {
  // Extract siteConfig from Docusaurus context
  const {siteConfig} = useDocusaurusContext();

  return (
    // Layout component provided by Docusaurus to wrap the page
    <Layout
      title={`Hello from ${siteConfig.title}`} // Set the page's title
      description="mafia fpga, RISCV mesh, many core">
      {/* Render the header component*/}
      <HomepageHeader />  
      <main>
        <br/>
        <div className="container">
          {/* Render the MDX content for the homepage */}
          <HomePageContent />
        </div>
        {/* Render a component showcasing the features */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
