# Project Gallery Structure

## Current Structure (Simplified)

```
/gallery/
├── banners/
│   ├── index.jpg            # Hero banner for home page
│   └── gallery.jpg          # Hero banner for gallery page
├── photos/
│   ├── cars/
│   │   ├── cars-001.jpg
│   │   ├── cars-002.jpg
│   │   └── cars-003.jpg
│   ├── realestate/
│   │   └── realestate-001.jpg
│   ├── restaurants/
│   │   └── restaurants-001.jpg
│   ├── fashion/
│   │   └── fashion-001.jpg
│   └── ads/
│       └── (empty - future content)
└── videos/
    └── (reel videos for featured reels section)
```

## Adding New Projects

1. Add photos to appropriate category folder: `gallery/photos/[category]/`
2. Follow naming convention: `[category]-###.jpg` (e.g., `cars-004.jpg`)
3. Update `script.js` SiteConfig:
   - Add new project object to the category's `projects` array
   - Set correct `photoCount` and `videoCount`
   - Choose descriptive `title` and `thumb` number

Example:
```javascript
{
    id: 'cars',
    name: 'Cars',
    folder: 'cars',
    projects: [
        { id: '001', title: 'Urban Flow', thumb: '001', photoCount: 1, videoCount: 0 },
        { id: '002', title: 'Neon Nights', thumb: '002', photoCount: 1, videoCount: 0 },
        { id: '004', title: 'New Project', thumb: '004', photoCount: 1, videoCount: 0 }
    ]
}
```

## How Gallery Rendering Works

1. **Home Page**: Shows 5 sample projects from `index.html` (hardcoded examples)
2. **Gallery Page**: Dynamically renders all projects from `SiteConfig` via `renderGalleryGrid()`
3. **Project Detail Page**: Loads individual project photos/videos based on URL parameters

## Current Content

- **Cars**: 3 photos (001, 002, 003)
- **Real Estate**: 1 photo (001)
- **Restaurants**: 1 photo (001)
- **Fashion**: 1 photo (001)
- **Ads**: 0 photos (empty category)

