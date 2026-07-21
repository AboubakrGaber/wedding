# Background music

Drop your chosen song here as **`wedding.mp3`** and it will play softly when a
guest opens the invitation (after they tap "Open Invitation", which satisfies
browser autoplay rules).

```
public/music/wedding.mp3
```

- Keep it a royalty-free / licensed track you have the right to use.
- ~3–5 MB is a good size for fast loading; the track loops automatically.
- Guests can pause/resume with the floating control in the bottom-right corner.
- If no file is present, the site simply runs without music (the control hides).

To change the filename or path, edit `musicSrc` in `src/lib/config.ts`.
