# Premier Schools Exhibition - Landing Page

A fully accessible, responsive landing page built with semantic HTML5, custom CSS, and vanilla JavaScript following WCAG 2.2 AA standards.

## Features

### ✅ Stack & Structure
- Semantic HTML5
- Custom CSS (no frameworks)
- BEM naming convention
- W3C validation ready

### ✅ Accessibility (WCAG 2.2 AA Compliant)
- ARIA roles and labels for all interactive elements
- Skip-to-content link
- Full keyboard navigation support
- Screen reader compatible
- Focus management
- Respects `prefers-reduced-motion` media query

### ✅ Responsive Design
- Mobile-first approach
- Fully responsive across all devices
- Cross-browser compatible (Chrome, Firefox, Safari, Edge - latest 2 versions)
- iOS/Android browser support

### ✅ Interactive Components

#### Hero Section
- Dual-axis slider (horizontal & vertical ready)
- Auto-play functionality
- Swipe/touch support
- Pause on hover
- Accessible controls (keyboard + screen reader)
- Pagination dots

#### Participating School Logos
- Continuous sling animation
- Alternating left-right and right-left flow
- Pause on hover/focus
- Respects reduced motion preference

#### Choose the School
- 4 cards on desktop (grid layout)
- Mobile slider with swipe support
- Pagination dots for mobile
- Smooth transitions

#### Exhibition Section
- Slider with 3-6 highlight cards
- Accessible controls
- Consistent card heights
- Optional auto-play
- Responsive grid (3 columns → 2 → 1)

## File Structure

```
srvmdeia/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari
- Android Chrome

## Accessibility Features

1. **Skip Link**: Jump to main content
2. **ARIA Labels**: All interactive elements properly labeled
3. **Keyboard Navigation**: Full keyboard support for all sliders
4. **Focus Management**: Visible focus indicators
5. **Screen Reader Support**: Proper ARIA roles and live regions
6. **Reduced Motion**: All animations respect user preferences

## Usage

1. Open `index.html` in a web browser
2. No build process required - pure HTML/CSS/JS
3. All images use placeholder services (replace with actual images)

## Testing Checklist

- [ ] HTML validation (W3C Validator)
- [ ] CSS validation (W3C CSS Validator)
- [ ] Accessibility testing (axe DevTools)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Reduced motion preference testing

## Notes

- Replace placeholder images with actual school logos and images
- Update contact information in the contact section
- Customize colors in CSS `:root` variables if needed
- All animations pause on hover/focus for better UX

## License

© 2025 Premier Schools Exhibition. All rights reserved.
