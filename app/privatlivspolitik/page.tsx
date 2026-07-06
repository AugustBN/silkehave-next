import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description: "Læs om hvordan SilkeHave håndterer dine personoplysninger.",
  alternates: { canonical: "https://silkehave.dk/privatlivspolitik" },
};

export default function PrivatlivspolitikPage() {
  return (
    <>
      <Header isStatic />
      <section className="page-head">
        <div className="page-head-inner">
          <span className="stb-eyebrow">Privatlivspolitik</span>
          <h1>Sådan bruger vi<br />dine oplysninger.</h1>
          <p>Vi samler kun det vi har brug for, og vi passer på det.</p>
        </div>
      </section>

      <section className="starticle">
        <div className="starticle-inner">

          <h2>Hvem er ansvarlig</h2>
          <p>
            SilkeHave er ansvarlig for behandlingen af dine personoplysninger.<br />
            CVR: 46370325<br />
            Adresse: C/O Alexander, Buskelundengen 98, 8600 Silkeborg<br />
            Mail: <a href="mailto:kontaktsilkehave@gmail.com">kontaktsilkehave@gmail.com</a><br />
            Tlf.: <a href="tel:+4591251021">+45 91 25 10 21</a>
          </p>
          <p>Har du spørgsmål til denne politik, så skriv eller ring. Vi svarer inden 30 dage.</p>

          <h2>Hvad vi indsamler</h2>
          <p>Vi indsamler kun oplysninger du selv giver os via kontaktformularen på silkehave.dk/kontakt:</p>
          <ul>
            <li>Navn</li>
            <li>Telefonnummer (valgfrit)</li>
            <li>E-mailadresse</li>
            <li>Adresse eller by</li>
            <li>Beskrivelse af opgaven</li>
            <li>Billeder af opgaven (valgfrit, op til 20 stk.)</li>
          </ul>
          <p>Vi indsamler ikke oplysninger fra andre steder. Vi bruger ikke cookies til sporing, og vi har ikke Google Analytics, Facebook Pixel eller lignende på sitet.</p>

          <h2>Hvad vi bruger dem til</h2>
          <p>Vi bruger dine oplysninger til at svare på din forespørgsel, give dig et tilbud og, hvis du bliver kunde, udføre opgaven.</p>
          <p>Dine oplysninger bliver ikke brugt til markedsføring og de bliver ikke solgt eller delt med andre end de systemer vi nævner nedenfor.</p>

          <h2>Retsgrundlag</h2>
          <p>Vi behandler dine oplysninger med hjemmel i:</p>
          <ul>
            <li><strong>GDPR artikel 6, stk. 1, litra b</strong>: fordi du kontakter os for at indgå en aftale om en opgave (kontraktforberedelse).</li>
            <li><strong>GDPR artikel 6, stk. 1, litra f</strong>: for at gemme korrespondance til bogføring og dokumentation (vores legitime interesse).</li>
          </ul>

          <h2>Hvor længe gemmer vi dem</h2>
          <p>Vi gemmer dine oplysninger så længe vi arbejder for dig, og 5 år efter den sidste opgave, fordi bogføringsloven kræver det.</p>
          <p>Kontakter du os, men vi ender ikke med at arbejde sammen, sletter vi dine oplysninger efter 6 måneder.</p>
          <p>Notifikationer om nye forespørgsler sendes via Telegram og slettes løbende derfra. Kundeoplysninger flyttes til e-mail og eventuelt regnskabssystem.</p>

          <h2>Hvem vi deler med</h2>
          <p>Vi bruger fire systemer der behandler data på vores vegne:</p>

          <aside>
            <h4>Vercel Inc. (hosting)</h4>
            <p>Sitet kører på Vercel, som er et amerikansk firma. Data overføres til USA under EU&apos;s standardkontraktbestemmelser (SCC). Vercel lader IP-adresser passere igennem datacentre i USA som led i DDoS-beskyttelse. Det er en teknisk nødvendighed ved at bruge platformen.</p>
          </aside>

          <aside>
            <h4>Telegram Messenger Inc. (notifikationer)</h4>
            <p>Vi modtager og opbevarer forespørgsler via Telegram. Det vil sige at din besked og eventuelle billeder gemmes på Telegrams servere, hvor vi kan se og besvare dem. Telegram er ikke dækket af EU&apos;s adequacy-afgørelser. Du kan anmode om sletning ved at kontakte os.</p>
          </aside>

          <aside>
            <h4>Google Gmail (e-mail)</h4>
            <p>Vores kontaktmail (kontaktsilkehave@gmail.com) er hostet hos Google. Svar på forespørgsler sendes og modtages via Gmail.</p>
          </aside>

          <aside>
            <h4>Google Search Console (søgesynlighed)</h4>
            <p>Vi bruger Google Search Console til at overvåge, hvordan siden optræder i Googles søgeresultater. Search Console behandler aggregerede data om søgeforespørgsler og klik. Ingen individuelle brugeroplysninger gemmes af SilkeHave. Data behandles af Google under deres privatlivspolitik.</p>
          </aside>

          <p>Vi har ikke databehandleraftaler med andre systemer, og vi deler ikke oplysninger med tredjeparter til markedsformål.</p>

          <h2>Dine rettigheder</h2>
          <p>Du har ret til at:</p>
          <ul>
            <li><strong>Indsigt</strong>: se hvilke oplysninger vi har om dig</li>
            <li><strong>Berigtigelse</strong>: få rettet forkerte oplysninger</li>
            <li><strong>Sletning</strong>: få dine oplysninger slettet</li>
            <li><strong>Begrænsning</strong>: begrænse behandlingen af dine oplysninger</li>
            <li><strong>Indsigelse</strong>: gøre indsigelse mod behandlingen</li>
            <li><strong>Dataportabilitet</strong>: få dine oplysninger udleveret i et maskinlæsbart format</li>
          </ul>
          <p>
            Skriv til <a href="mailto:kontaktsilkehave@gmail.com">kontaktsilkehave@gmail.com</a> for at udøve dine rettigheder. Vi svarer inden 30 dage.
          </p>
          <p>
            Du kan også klage til Datatilsynet. Se mere på <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">datatilsynet.dk</a>.
          </p>

          <h2>Cookies</h2>
          <p>Sitet bruger kun tekniske cookies, der er nødvendige for at det virker. Vi sætter ikke sporings- eller marketingcookies, og vi viser ikke et cookie-banner, for der er ikke noget at tage stilling til.</p>

          <p style={{ marginTop: 48, fontSize: 14, color: "var(--stone)" }}>
            Senest opdateret: 5. juli 2026
          </p>

          <p style={{ marginTop: 32 }}>
            <Link href="/kontakt" className="stb stb-ghost">
              Gå til kontaktformularen
            </Link>
          </p>

        </div>
      </section>
    </>
  );
}
