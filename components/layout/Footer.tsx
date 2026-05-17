import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="stft">
      <div className="stft-inner">
        <div className="stft-brand">
          <Image src="/assets/logo-mark.svg" alt="Silke" width={48} height={48} />
          <p>Have‑ og ejendomsservice<br />i Midtjylland.</p>
        </div>
        <div className="stft-col">
          <h4>Ydelser</h4>
          <Link href="/service">Haveordning</Link>
          <Link href="/service">Hækklipning</Link>
          <Link href="/service">Græsslåning</Link>
          <Link href="/service">Fliserens</Link>
          <Link href="/service">Vinduesrens</Link>
          <Link href="/service">Snerydning</Link>
        </div>
        <div className="stft-col">
          <h4>Firma</h4>
          <Link href="/om-os">Om os</Link>
          <Link href="/omraade">Område</Link>
          <Link href="/kontakt">Kontakt</Link>
        </div>
        <div className="stft-col">
          <h4>Kontakt</h4>
          <span><Image src="/assets/icon-phone.svg" alt="" width={14} height={14} /> -- -- -- --</span>
          <span><Image src="/assets/icon-mail.svg" alt="" width={14} height={14} /> --</span>
          <a href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener">
            <Image src="/assets/icon-arrow-right.svg" alt="" width={14} height={14} /> Facebook · silkehave
          </a>
          <span className="stft-meta"><Image src="/assets/icon-mappin.svg" alt="" width={14} height={14} /> Midtjylland</span>
        </div>
      </div>
      <div className="stft-base">
        <span>© Silke Total Service</span>
        <span>Have‑ og ejendomsservice</span>
      </div>
    </footer>
  );
}
