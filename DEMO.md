# LEVERAGE Demo Mode - Documentation

## Overview

The Demo Mode (`/demo`) is a fully functional, interactive showcase of all LEVERAGE platform features. It's designed for:
- Sales presentations
- Investor demos
- Product demonstrations
- Video production (story video)

## Features Included

### 1. Trade OS Hero (Scene 5-6)
- Animated LEVERGE logo with glow effect
- Module connection visualization
- Stats counters (50,000+ traders, $2.5B+ volume, etc.)
- Floating particles animation
- Grid background following mouse

### 2. Marketplace (Scene 7)
- Product grid with images, prices, ratings
- Add to cart functionality (with localStorage)
- Favorites system
- RFQ creation form
- RFQ list with status badges
- Quick filters
- Responsive design

### 3. Documents (Scene 8)
- 8 document types: Invoice, Packing List, BL, COO, LC, Insurance, Export License, Bill of Entry
- Live document preview
- AI generation animation
- Form auto-fill simulation
- Download/Share buttons (UI only)

### 4. Compliance (Scene 8)
- HS code search with instant results
- AI-powered HS code suggestions
- Duty calculator with country selection
- Pre-shipment checklist
- Compliance status indicators

### 5. Freight (Scene 9)
- Animated SVG world map
- Trade routes visualization
- Live tracking timeline
- Shipping quotes comparison
- Carrier recommendations
- Real-time tracking status

### 6. Payments (Scene 9)
- Escrow payment flow visualization
- 4-step animated process
- Payment methods grid
- Multi-currency support
- Transaction history

### 7. AI Copilot (Scene 10)
- Chat interface with typing indicators
- Pre-scripted intelligent responses
- Quick action buttons
- HOJAI AI branding
- Message history

### 8. Network (Scene 11)
- Animated world map with connection nodes
- Verified partner directory
- Filter by business type
- Partner cards with trade volume
- Network effect visualization

## How to Access

```bash
# Development
http://localhost:3000/demo

# Production (after deployment)
https://leverage.com/demo
https://leverge.one/demo (planned)
```

## Navigation

The demo page features:
- Fixed top navigation bar with section links
- Fixed bottom navigation dots for quick section switching
- Keyboard navigation (arrow keys)
- Smooth scroll between sections
- Auto-demo mode (plays through all sections)

## For Video Production

### Recommended Workflow

1. **Record the Demo Page**
   - Use the Auto Demo feature for consistent playback
   - Or manually navigate through sections

2. **Screen Recording Settings**
   - Resolution: 1920x1080 or higher
   - Frame rate: 60fps for smooth animations
   - Include browser chrome: No (use frameless mode)

3. **Post-Production**
   - Add voiceover
   - Add background music (suggested: cinematic piano → rising orchestra)
   - Add text overlays
   - Add transitions between scenes

### Scenes Mapping

| Demo Section | Video Scene | Timestamp |
|-------------|-------------|-----------|
| Hero | Scene 5-6 | 38-58s |
| Marketplace | Scene 7 | 58-68s |
| Documents | Scene 8 | 68-78s |
| Compliance | Scene 8 | 72-78s |
| Freight | Scene 9 | 78-88s |
| Payments | Scene 9 | 82-88s |
| AI Copilot | Scene 10 | 88-100s |
| Network | Scene 11 | 100-108s |

## Technical Details

### Technologies Used
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

### State Management
- React useState/useEffect for local state
- No external state library needed
- localStorage for cart persistence

### Animations
- Framer Motion for complex animations
- CSS animations for simple effects
- SVG animations for trade routes
- React Spring for physics-based motion

## Customization

### Changing Demo Data
Edit the mock data arrays in each section component:
- Products array
- RFQs array
- Partners array
- HS codes database

### Styling
The demo uses a dark theme with emerald accents:
- Background: `slate-950` to `slate-900`
- Primary: `emerald-500`
- Accent: `amber-500`, `cyan-500`, `purple-500`

### Adding New Sections
1. Create a new section component
2. Add to the `sections` array in `DemoPage`
3. Add conditional rendering in main content area

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lazy loaded sections (AnimatePresence)
- Optimized animations (will-change, transform)
- No heavy dependencies
- Smooth 60fps target

---

For questions or support, contact the development team.
