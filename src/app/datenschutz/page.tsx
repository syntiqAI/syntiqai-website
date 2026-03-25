export default function Datenschutz() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Datenschutzerklärung</h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '3rem', fontSize: '0.875rem' }}>Stand: März 2026</p>

      <div className="prose">

        <h2>1. Verantwortlicher</h2>
        <p>
          Thomas Zach / SyntiqAI<br />
          Baden bei Wien, Österreich<br />
          E-Mail: <a href="mailto:office@syntiq-ai.at">office@syntiq-ai.at</a>
        </p>

        <h2>2. Welche Daten wir verarbeiten</h2>

        <h3>2.1 Besuch der Website</h3>
        <p>
          Beim Aufrufen unserer Website werden durch den Hosting-Anbieter <strong>Vercel</strong> technische Zugriffsdaten verarbeitet (IP-Adresse, Browser, Betriebssystem, Uhrzeit des Zugriffs). Diese Daten sind für die technische Auslieferung der Website notwendig und werden nicht dauerhaft gespeichert oder für Tracking-Zwecke verwendet.
        </p>
        <p>
          Wir verwenden <strong>kein Google Analytics, kein Facebook Pixel und kein sonstiges Tracking</strong>.
        </p>

        <h3>2.2 Cookies</h3>
        <p>
          Diese Website verwendet ausschließlich <strong>technisch notwendige Cookies</strong>:
        </p>
        <ul>
          <li><strong>Session-Cookie (next-auth.session-token)</strong>: Wird gesetzt wenn du dich im Admin-Bereich einloggst. Enthält eine verschlüsselte Session-ID. Wird beim Abmelden oder beim Schließen des Browsers gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Funktionsfähigkeit des Systems).</li>
        </ul>
        <p>
          Da wir ausschließlich technisch notwendige Cookies verwenden, ist für diese keine Einwilligung erforderlich.
        </p>

        <h3>2.3 Newsletter</h3>
        <p>Wenn du dich für unseren Newsletter anmeldest, speichern wir:</p>
        <ul>
          <li>E-Mail-Adresse (Pflichtfeld)</li>
          <li>Name (freiwillig)</li>
          <li>Datum und Uhrzeit der Anmeldung</li>
          <li>Text der Einwilligungserklärung zum Zeitpunkt der Anmeldung</li>
          <li>Einen eindeutigen Abmelde-Token</li>
        </ul>
        <p><strong>Zweck:</strong> Ausschließlich für den Versand des SyntiqAI-Newsletters (Updates, neue Funktionen, relevante Informationen rund um AI & Automation).</p>
        <p><strong>Rechtsgrundlage:</strong> Deine ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst diese jederzeit widerrufen.</p>
        <p>
          <strong>Speicherort:</strong> Die Newsletter-Daten werden in einer <strong>Upstash Redis</strong>-Datenbank gespeichert, Serverstandort <strong>EU-Frankfurt (Deutschland)</strong>. Upstash ist DSGVO-konform.
        </p>
        <p>
          <strong>Abmeldung:</strong> Jederzeit möglich über den Abmelde-Link im Newsletter oder per E-Mail an <a href="mailto:office@syntiq-ai.at">office@syntiq-ai.at</a>. Nach Abmeldung werden deine Daten nicht mehr für den Versand verwendet und auf Anfrage vollständig gelöscht.
        </p>

        <h3>2.4 Kontaktaufnahme per E-Mail</h3>
        <p>
          Wenn du uns per E-Mail kontaktierst, speichern wir deine Nachricht und E-Mail-Adresse zur Bearbeitung deiner Anfrage. Diese Daten werden nicht an Dritte weitergegeben und nach Abschluss des Vorgangs gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </p>

        <h2>3. Hosting & Infrastruktur</h2>

        <h3>3.1 Website-Hosting (Vercel)</h3>
        <p>
          Diese Website wird über <strong>Vercel Inc.</strong> (340 Pine Street, San Francisco, CA 94104, USA) gehostet. Vercel ist gemäß EU-US Data Privacy Framework zertifiziert und verarbeitet Daten im Rahmen der Auslieferung der Website. Details: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>
        </p>

        <h3>3.2 Datenspeicherung (Upstash Redis)</h3>
        <p>
          Für die Speicherung von Newsletter-Daten und Anwendungsdaten nutzen wir <strong>Upstash</strong> (Redis-Datenbank, Serverstandort EU-Frankfurt, Deutschland). Die Daten verlassen den EU-Raum nicht. Details: <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noopener noreferrer">Upstash Privacy Policy</a>
        </p>

        <h3>3.3 Kommunikationsinfrastruktur (Matrix)</h3>
        <p>
          Für die interne Kommunikation zwischen KI-Agenten betreiben wir einen eigenen <strong>Matrix-Server</strong> unter <strong>chat.syntiq-ai.at</strong>. Dieser Server wird vollständig selbstgehostet auf eigener Infrastruktur in Österreich betrieben. Es werden keine Daten an Dritte übermittelt.
        </p>

        <h2>4. Deine Rechte (DSGVO)</h2>
        <p>Du hast jederzeit das Recht auf:</p>
        <ul>
          <li><strong>Auskunft</strong> über deine gespeicherten Daten (Art. 15 DSGVO)</li>
          <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
          <li><strong>Löschung</strong> deiner Daten (Art. 17 DSGVO)</li>
          <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
          <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
          <li><strong>Widerruf</strong> einer Einwilligung jederzeit ohne Angabe von Gründen</li>
        </ul>
        <p>
          Für alle Anfragen: <a href="mailto:office@syntiq-ai.at">office@syntiq-ai.at</a>
        </p>
        <p>
          Du hast außerdem das Recht, eine Beschwerde bei der österreichischen Datenschutzbehörde einzureichen:<br />
          <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a>
        </p>

        <h2>5. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die aktuelle Version ist stets auf dieser Seite abrufbar. Stand: März 2026.
        </p>

        <h2>6. Kontakt</h2>
        <p>Bei Fragen zum Datenschutz: <a href="mailto:office@syntiq-ai.at">office@syntiq-ai.at</a></p>

      </div>
    </div>
  )
}
