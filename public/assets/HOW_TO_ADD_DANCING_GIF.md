# How to Add a Dancing GIF (Rick Astley, Fortnite, etc.)

## Quick Start

1. **Find Your GIF**
   - Search for "rick astley dancing gif" or "fortnite dance gif" on:
     - https://giphy.com
     - https://tenor.com
     - Google Images (filter by GIF)

2. **Save the GIF**
   - Right-click on the GIF and "Save Image As..."
   - Save it to this folder (`public/assets/`)
   - Recommended name: `rickroll-dance.gif` or `fortnite-dance.gif`

3. **Update the Code**
   - Open `src/main.js`
   - Find the `initSpinningFavicon` section
   - Change the `imageUrl` to your GIF filename:
   ```javascript
   const spinningFavicon = initSpinningFavicon({
       imageUrl: 'assets/rickroll-dance.gif',  // Your GIF here!
       imageScale: 0.9,
       size: 64,
       autoRotationSpeed: 0
   });
   ```

4. **Rebuild and Test**
   ```bash
   npm run build
   npm run devserver
   ```
   Then open http://localhost:8000 and drag your mouse to see the spinning GIF favicon!

## Tips for Best Results

- **GIF Size:** Use GIFs around 64x64 to 128x128 pixels for best performance
- **Transparent Background:** GIFs with transparent backgrounds look best when spinning
- **File Size:** Keep GIF under 1MB for faster loading
- **Frame Rate:** 10-20 FPS animated GIFs work well

## Popular Dancing GIF Sources

### Rick Astley / Rickroll
- "Never Gonna Give You Up" dance
- Fortnite "Never Gonna" emote

### Fortnite Dances
- Default Dance
- Take the L
- Orange Justice
- Any Fortnite emote

### Other Options
- Cartoon characters dancing
- Pixel art dancers
- Custom animations

## Licensing & Copyright

**Important:** Make sure you have the right to use any GIF you download!

### Free/Royalty-Free Sources:
- **Giphy**: Most GIFs are free to use, but check the individual GIF's license
- **Tenor**: Generally free for personal use
- **Creative Commons**: Search for CC-licensed GIFs
- **Make Your Own**: Create custom pixel art or animations

### Fair Use Considerations:
- Personal projects and portfolios: Generally okay
- Commercial use: May require licensing
- Parody/transformative use: May be protected

**Recommendation:** For Rick Astley dancing or Fortnite emotes, using them in a personal portfolio site is typically considered fair use, but always verify for your specific use case.

## Example GIF URLs (for reference)

Search these terms on Giphy/Tenor:
- "rick astley dance"
- "rickroll dance"
- "fortnite default dance"
- "fortnite orange justice"
- "dancing emoji"

**Always respect copyright and use GIFs responsibly!** When in doubt, create your own or use Creative Commons licensed content.
