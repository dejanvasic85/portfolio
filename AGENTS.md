# Agent Instructions

## Plain language

All writing presented to the user — chat responses, PR descriptions, comments, docs — must
follow the ISO 24495-1:2023 plain language standard. Regular reasoning can stay as complex as
the task needs; this only applies to language shown to the user.

Write so the reader can find what they need, understand it the first time, and use it, by
following these principles:

- Say one thing per sentence. Prefer short sentences and everyday words over jargon.
- Lead with the point, not the setup.
- Use active voice and address the reader directly ("you") where it fits.
- Structure content so the most important information comes first.
- Avoid unnecessary abbreviations, legalese, and filler phrases.

This does not apply to code, code comments, or technical identifiers (file paths, function
names, config keys), only to prose written for the user.

## Code review

After making any set of changes, run the `/caveman-review` skill and address any warranted
concerns before considering the work complete.
