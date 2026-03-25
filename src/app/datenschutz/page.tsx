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

        <h2>2. Newsletter</h2>
        <h3>Was wir speichern</h3>
        <p>Wenn du dich für unseren Newsletter anmeldest, speichern wir:</p>
        <ul>
          <li>E-Mail-Adresse (Pflichtfeld)</li>
          <li>Name (freiwillig)</li>
          <li>Datum und Uhrzeit der Anmeldung</li>
          <li>Text der Einwilligungserklärung</li>
          <li>Einen eindeutigen Abmelde-Token</li>
        </ul>

        <h3>Zweck der Verarbeitung</h3>
        <p>Die Daten werden ausschließlich für den Versand des SyntiqAI-Newsletters verwendet (Updates, neue Funktionen, relevante Informationen rund um AI & Automation).</p>

        <h3>Rechtsgrundlage</h3>
        <p>Die Verarbeitung erfolgt auf Grundlage deiner ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst diese Einwilligung jederzeit widerrufen.</p>

        <h3>Wo deine Daten gespeichert werden</h3>
        <p>
          Die Newsletter-Daten werden in einer <strong>Upstash Redis</strong>-Datenbank gespeichert, die auf der Infrastruktur von <strong>Vercel</strong> betrieben wird.
          Der Serverstandort ist <strong>EU-Frankfurt (Deutschland)</strong>.
          Sowohl Upstash als auch Vercel sind DSGVO-konform und haben entsprechende Datenverarbeitungsverträge (DPA) abgeschlossen.
        </p>

        <h3>Abmeldung</h3>
        <p>Du kannst dich jederzeit vom Newsletter abmelden. Jeder Newsletter enthält einen Abmelde-Link am Ende der E-Mail. Nach der Abmeldung werden deine Daten als inaktiv markiert und nicht mehr für den Versand verwendet. Auf Anfrage werden sie vollständig gelöscht.</p>

        <h2>3. Deine Rechte (DSGVO)</h2>
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

        <h2>4. Website & Hosting</h2>
        <p>
          Diese Website wird über <strong>Vercel</strong> (San Francisco, USA) gehostet. Vercel verarbeitet technische Daten wie IP-Adressen zur Auslieferung der Website.
          Vercel ist gemäß EU-US Data Privacy Framework zertifiziert. Details: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>
        </p>

        <h2>5. Kontakt</h2>
        <p>Bei Fragen zum Datenschutz: <a href="mailto:office@syntiq-ai.at">office@syntiq-ai.at</a></p>

      </div>
    </div>
  )
}
