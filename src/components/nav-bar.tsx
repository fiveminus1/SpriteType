"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/nav.module.css';
import { FiSettings } from 'react-icons/fi';

export default function NavBar() {
  return (
    <div className={`${styles["nav-bar"]} flex items-center justify-between p-4 bg-gray-300`}>
      <div className="flex items-center">    
        <Image
          src="/sprite-type-logo.png"
          width={60}
          height={60}
          alt="sprite type logo"
        />
        <h1 className="pl-4">sprite type</h1>
      </div>

      {/* <button
        onClick={() => {
          console.log('test settings button')
        }}
        className="p-2 rounded-full hover:bg-gray-300 transition-all"
      >
        <FiSettings className="w-6 h-6 text-black" />
      </button> */}
    </div>
  );
}