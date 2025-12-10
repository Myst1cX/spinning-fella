# Spinning Fella 🕺

An interactive 3D web experience with a spinning character and an animated favicon that responds to mouse drag!

## Features

- **Interactive 3D Character**: Click on the character to make it spin
- **Spinning Favicon**: The favicon rotates when you drag your mouse anywhere on the page
- **Synchronized Animation**: When the 3D character is spinning, the favicon spins along with it
- **Touch Support**: Works on mobile devices with touch events
- **Easter Eggs**: Type hidden keywords to unlock special effects!

## Spinning Favicon

The favicon uses a canvas-based rendering system that updates in real-time based on user interaction:

- **Mouse Drag**: Click and drag anywhere on the page to rotate the favicon
- **Touch Drag**: Works on mobile - touch and drag to rotate
- **Auto-rotation**: When the 3D character is spinning (click on it), the favicon automatically rotates at the same speed

### Customizing the Favicon Character

You can easily customize the favicon by modifying the initialization in `src/main.js`:

#### Using an Animated GIF (like Rick Astley dancing!)

```javascript
const spinningFavicon = initSpinningFavicon({
    imageUrl: 'assets/rickroll-dance.gif',  // Path to your GIF file
    imageScale: 0.9,    // Scale the image (0.0 to 1.0)
    size: 64,           // Canvas size
    dragSensitivity: 0.02  // How fast it rotates when dragging
});
```

**To add Rick Astley or any custom GIF:**
1. Find a GIF you like (e.g., Rick Astley dancing from Fortnite)
2. Save it to `public/assets/` folder (e.g., `rickroll-dance.gif`)
3. Update the `imageUrl` in `src/main.js` to point to your GIF
4. Rebuild with `npm run build`

#### Using Emoji/Text Character (Fallback)

```javascript
const spinningFavicon = initSpinningFavicon({
    character: '🕺',  // Change to any emoji
    fontSize: 48,
    size: 64
});
```

**Example characters you can use:**
- `'🕺'` - Man dancing (default)
- `'💃'` - Woman dancing  
- `'🎉'` - Party popper
- `'🌟'` - Star
- `'😎'` - Cool face
- `'🚀'` - Rocket
- `'🎮'` - Video game controller
- Or any emoji or text character!

**Supported Image Formats:**
- Animated GIF (`.gif`) - Perfect for dancing animations!
- PNG (`.png`) - Static images
- JPEG (`.jpg`, `.jpeg`) - Static images

**Note:** Animated GIFs will be rendered frame-by-frame on the rotating canvas. For best results, use GIFs with transparent backgrounds and dimensions around 64x64 to 128x128 pixels.

## Development

### Install dependencies
```bash
npm install
# or
yarn install
```

### Run development server
```bash
npm run devserver
```

Then open http://localhost:8000 in your browser.

### Build for production
```bash
npm run build-prod
```

### Deploy to GitHub Pages
```bash
node publish.js
```

## How It Works

The spinning favicon is implemented using HTML5 Canvas API:

1. A canvas element is created dynamically (64x64 pixels by default)
2. An image (GIF/PNG/JPEG) or character is drawn on the canvas with rotation
3. The canvas is converted to a data URI (base64 PNG)
4. The favicon link's href is updated with the new data URI
5. This happens every frame (60 FPS) for smooth animation

**For Animated GIFs:** The browser will render the current frame of the GIF onto the canvas, which then gets rotated. This creates a double animation effect - the GIF animates AND rotates!

### Where to Find Dancing GIFs

**Rick Astley Dancing:**
- Search "rick astley dancing gif" on Giphy, Tenor, or Google Images
- Fortnite emotes: Search "fortnite dance gif" or "fortnite emote gif"
- Right-click and save the GIF, then add it to `public/assets/`

**Popular Sources:**
- https://giphy.com (search "rick roll dance" or "fortnite dance")
- https://tenor.com
- Reddit r/gifs

The rotation is controlled by:
- Mouse/touch drag events that calculate delta movement
- Auto-rotation when the 3D character is spinning
- requestAnimationFrame for smooth, efficient updates

## Browser Compatibility

The spinning favicon works in all modern browsers that support:
- Canvas API
- Data URIs for favicons
- Mouse and Touch events

Note: Some browsers may not update the favicon as frequently due to performance optimizations, but the effect should still be visible.

## Credits

Built with Three.js and lots of ✨ magic ✨
