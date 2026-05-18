import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="stft">
      <div className="stft-inner">
        <div className="stft-brand">
          <Image src="/assets/logo-mark.svg" alt="SilkeHave" width={48} height={48} />
          <p>Have‑ og ejendomsservice<br />i Midtjylland.</p>
        </div>
        <div className="stft-col">
          <h4>Ydelser</h4>
          <Link href="/services/haveordning">Haveordning</Link>
          <Link href="/services/haekklipning">Hækklipning</Link>
          <Link href="/services/fliserens">Fliserens</Link>
          <Link href="/services/vinduesrens">Vinduesrens</Link>
          <Link href="/services/snerydning">Snerydning</Link>
        </div>
        <div className="stft-col">
          <h4>Firma</h4>
          <Link href="/om-os">Om os</Link>
          <Link href="/omraade">Område</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/privatlivspolitik">Privatlivspolitik</Link>
        </div>
        <div className="stft-col">
          <h4>Kontakt</h4>
          <a href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/icon-arrow-right.svg" alt="" width={14} height={14} /> Facebook · silkehave
          </a>
          <span className="stft-meta"><Image src="/assets/icon-mappin.svg" alt="" width={14} height={14} /> Midtjylland</span>
        </div>
      </div>
      <div className="stft-base">
        <span>© SilkeHave {new Date().getFullYear()}</span>
        <span>Have‑ og ejendomsservice · Midtjylland</span>
      </div>
    </footer>
  );
}
