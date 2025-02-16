document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('section[class*="bg-[url"]');
    let currentX = 0;
    let currentY = 0;
    const smoothness = 0.08; // Lower = smoother (between 0 and 1)
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        requestAnimationFrame(updatePosition);
        
        function updatePosition() {
            // Smooth interpolation
            currentX += (mouseX * 30 - currentX) * smoothness;
            currentY += (mouseY * 30 - currentY) * smoothness;
            
            // Apply the transform
            heroSection.style.backgroundPosition = `calc(50% + ${-currentX}px) calc(50% + ${-currentY}px)`;
            
            requestAnimationFrame(updatePosition);
        }
    });
});
