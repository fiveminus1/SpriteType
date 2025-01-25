import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/nav.module.css';

export default function NavBar() {
  return (
    <div className={styles["nav-bar"]}>
      <Image
        src="/sprite-type-logo.png"
        width={60}
        height={60}
        alt="sprite type logo"
      />
      <h1 className="pl-4">sprite type</h1>
    </div>
  )
}