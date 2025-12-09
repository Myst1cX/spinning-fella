/**
 * Spinning Favicon Module
 * Creates an interactive favicon that spins based on mouse drag
 */

export class SpinningFavicon {
    constructor(options = {}) {
        this.size = options.size || 64;
        this.character = options.character || '🕺';
        this.fontSize = options.fontSize || 48;
        this.rotation = 0;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.autoRotationSpeed = options.autoRotationSpeed || 0;
        this.dragSensitivity = options.dragSensitivity || 0.02;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d');
        
        this.faviconLink = document.querySelector('link[rel*="icon"]') || this.createFaviconLink();
        
        this.init();
    }
    
    createFaviconLink() {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        document.head.appendChild(link);
        return link;
    }
    
    init() {
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        document.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.lastMouseX;
                const deltaY = e.clientY - this.lastMouseY;
                
                // Calculate rotation based on mouse movement
                this.rotation += (deltaX + deltaY) * this.dragSensitivity;
                
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
        
        // Also handle touch events for mobile
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.isDragging = true;
                this.lastMouseX = e.touches[0].clientX;
                this.lastMouseY = e.touches[0].clientY;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (this.isDragging && e.touches.length > 0) {
                const deltaX = e.touches[0].clientX - this.lastMouseX;
                const deltaY = e.touches[0].clientY - this.lastMouseY;
                
                this.rotation += (deltaX + deltaY) * this.dragSensitivity;
                
                this.lastMouseX = e.touches[0].clientX;
                this.lastMouseY = e.touches[0].clientY;
            }
        });
        
        document.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.size, this.size);
        
        // Save context
        this.ctx.save();
        
        // Move to center
        this.ctx.translate(this.size / 2, this.size / 2);
        
        // Rotate
        this.ctx.rotate(this.rotation);
        
        // Draw character
        this.ctx.font = `${this.fontSize}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.character, 0, 0);
        
        // Restore context
        this.ctx.restore();
    }
    
    updateFavicon() {
        this.faviconLink.href = this.canvas.toDataURL('image/png');
    }
    
    animate() {
        // Apply auto-rotation if not dragging
        if (!this.isDragging && this.autoRotationSpeed !== 0) {
            this.rotation += this.autoRotationSpeed;
        }
        
        this.draw();
        this.updateFavicon();
        
        requestAnimationFrame(() => this.animate());
    }
    
    setCharacter(character) {
        this.character = character;
    }
    
    setAutoRotationSpeed(speed) {
        this.autoRotationSpeed = speed;
    }
    
    setRotation(rotation) {
        this.rotation = rotation;
    }
}

// Create default instance with the spinning fella emoji
export function initSpinningFavicon(options = {}) {
    return new SpinningFavicon(options);
}
