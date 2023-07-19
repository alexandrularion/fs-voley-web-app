import React, { FC } from 'react';
import Head from 'next/head';
import { ISEOHead } from './Interfaces';
import favicon from '../../public/favicon.ico';
import favicon32 from '../../public/favicon-32x32.png';
import favicon96 from '../../public/favicon-96x96.png';
import favicon16 from '../../public/favicon-16x16.png';
import android192 from '../../public/android-icon-192x192.png';
import appleIcon57 from '../../public/apple-icon-57x57.png';
import appleIcon60 from '../../public/apple-icon-60x60.png';
import appleIcon72 from '../../public/apple-icon-72x72.png';
import appleIcon76 from '../../public/apple-icon-76x76.png';
import appleIcon114 from '../../public/apple-icon-114x114.png';
import appleIcon120 from '../../public/apple-icon-120x120.png';
import appleIcon144 from '../../public/apple-icon-144x144.png';
import appleIcon152 from '../../public/apple-icon-152x152.png';
import appleIcon180 from '../../public/apple-icon-180x180.png';
import msIcon144 from '../../public/ms-icon-144x144.png';

const SEOHead: FC<ISEOHead> = ({ metaTitle, metaDescription, metaImage, metaURL }) => {
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="title" property="og:title" content={metaTitle} />
      <meta name="type" property="og:type" content="website" />
      <meta name="image" property="og:image" content={metaImage} />
      <meta name="description" property="og:description" content={metaDescription} />
      <meta name="url" property="og:url" content={metaURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="shortcut icon" href={favicon.src} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32.src} />
      <link rel="icon" type="image/png" sizes="96x96" href={favicon96.src} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16.src} />
      <link rel="icon" type="image/png" sizes="192x192" href={android192.src} />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff" />
      <link rel="apple-touch-icon" sizes="57x57" href={appleIcon57.src} />
      <link rel="apple-touch-icon" sizes="60x60" href={appleIcon60.src} />
      <link rel="apple-touch-icon" sizes="72x72" href={appleIcon72.src} />
      <link rel="apple-touch-icon" sizes="76x76" href={appleIcon76.src} />
      <link rel="apple-touch-icon" sizes="114x114" href={appleIcon114.src} />
      <link rel="apple-touch-icon" sizes="120x120" href={appleIcon120.src} />
      <link rel="apple-touch-icon" sizes="144x144" href={appleIcon144.src} />
      <link rel="apple-touch-icon" sizes="152x152" href={appleIcon152.src} />
      <link rel="apple-touch-icon" sizes="180x180" href={appleIcon180.src} />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#fff" />
      <meta name="msapplication-TileImage" content={msIcon144.src} />
      <meta name="theme-color" content="#fff" />
    </Head>
  );
};
export default SEOHead;
