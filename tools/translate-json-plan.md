# Translation plan for Sahihayn JSON files

Goal: add Russian and Georgian translation fields into every hadith JSON object.

Current source fields:

```json
{
  "arabic": "original Arabic text",
  "english": "English translation from source JSON"
}
```

Target fields:

```json
{
  "arabic": "original Arabic text - never changed",
  "english": "English translation from source JSON",
  "russian": "Russian translation based on Arabic + English",
  "georgian": "Georgian translation based on Arabic + English"
}
```

Rules:

1. Do not change `arabic`.
2. Do not change `english`.
3. Do not change `reference`, `id`, `book`, `collection`, or hadith numbering.
4. Add only new fields: `russian` and `georgian`.
5. Translation should use English as the working translation and Arabic as the meaning check.
6. If the translation is not reviewed yet, it should be marked internally as draft before being treated as official.

Recommended workflow:

1. Process files in batches, not all at once.
2. Start with `data/bukhari/bukhari_1.json` and `data/muslim/001_the_book_of_faith.json`.
3. Add translations.
4. Review in the app.
5. Continue file by file.

Important: these translations should not be presented as official scholarly translations until reviewed.
