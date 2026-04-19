## Suche im Repository: Ist-Zustand und Empfehlung

### Ist-Zustand (aktuell im Code)
- Suche basiert auf einem lokalen Index (`SEARCH_TERMS`) in `src/lib/search-terms.ts`.
- Matching war ursprünglich rein substring-basiert, jetzt erweitert um:
  - Tokenisierung + Normalisierung (diakritikfrei, kleingeschrieben)
  - kleine Synonym-Tabelle ("KI" ↔ "AI", "lernen" ↔ "tutorial")
  - Prefix-Matching für bessere Typeahead-Erfahrung
- UI-seitig wird die Suche in `HeaderSearch` als Client-Typeahead angezeigt.

### Bewertung: kleines Embedding-Modell lokal
**Kurzfazit:** Für den aktuellen Umfang ist ein lokales Embedding-Modell noch nicht zwingend, aber als nächste Ausbaustufe sinnvoll, sobald der Content deutlich wächst.

#### Wann es sich lohnt
- >100–200 Wiki-/Academy-Einträge
- Häufige semantische Anfragen mit Formulierungsvielfalt
- Bedarf an "ähnlichen Inhalten" oder "related content" auf Basis von Bedeutung statt Keywords

#### Vorteile lokal
- Keine zusätzlichen API-Kosten pro Suchanfrage
- Datenschutzfreundlicher (keine Query-Weitergabe)
- Konstante Latenz auch bei hoher Last

#### Nachteile lokal
- Zusätzliche Komplexität (Index-Job, Re-Embedding bei Content-Änderungen)
- Mehr Betriebsverantwortung (Model-/Vectorstore-Versionierung)
- Bei sehr kleinem Korpus oft Overkill gegenüber gutem Lexical Ranking

### Konkreter, pragmatischer Pfad
1. **Jetzt**: Lightweight-Suche (bereits umgesetzt) beibehalten.
2. **Nächster Schritt**: Hybrid-Ranking einführen:
   - Lexical Score (bestehende Suche)
   - + optionaler Embedding Score
3. **Später**: Offline-Index-Job (Build-Zeit) und lokaler Vector Store (z. B. SQLite + Vektor-Extension).

### Alternativvorschlag ohne Embeddings (hoher Nutzen, wenig Aufwand)
- Facetten/Filter in der Suche (Kategorie, Tooling, Einstieg/Advanced)
- "Meinten Sie …?" via Tippfehler-Korrektur
- Query-Logs auswerten und Synonym-Liste datengetrieben erweitern
- Interne Verlinkung in Wiki-Artikeln stärken (Related-Taxonomie statt nur freie Begriffe)

Dieser Weg verbessert Auffindbarkeit sofort und kann später nahtlos in eine Hybrid-Suche überführt werden.
