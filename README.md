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

You can easily customize the favicon character by modifying the initialization in `src/main.js`:

```javascript
const spinningFavicon = initSpinningFavicon({
    character: '🕺',  // Change this to any emoji or character
    fontSize: 48,      // Adjust the size of the character
    size: 64,          // Canvas size (should match favicon size)
    autoRotationSpeed: 0  // Set to 0 for manual control only
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

1. A canvas element is created dynamically (64x64 pixels)
2. The character is drawn on the canvas with rotation
3. The canvas is converted to a data URI (base64 PNG)
4. The favicon link's href is updated with the new data URI
5. This happens every frame (60 FPS) for smooth animation

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
