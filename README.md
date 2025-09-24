# WEB103 Project 1 - *SuperHero Hub*

Submitted by: **Justin Huang**

About this web app: **SuperHero Hub is a dynamic web application that showcases popular superheroes from both DC Comics and Marvel Comics universes. Users can browse through superhero cards displaying their powers and universe affiliations, then click for detailed information including age, location, and origin stories. The app features a modern dark theme with responsive design and smooth animations.**

Time spent: **8** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view should be a unique endpoint, such as as `localhost:3000/bosses/crystalguardian` and `localhost:3000/mantislords`**
  - [x] *Note: When showing this feature in the video walkthrough, please show the unique URL for each detailed view. We will not be able to give points if we cannot see the implementation* 
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

The following **optional** features are implemented:

- [x] The web app displays items in a unique format, such as cards rather than lists or animated list items
- [x] Dark mode theme implementation
- [x] Hover animations and smooth transitions
- [x] Responsive grid layout
- [x] Custom styling enhancements over base PicoCSS

The following **additional** features are implemented:

- [x] **Dynamic Header**: JavaScript-generated header with logo and navigation
- [x] **Card Hover Effects**: Cards lift and change shadow on hover for better interactivity
- [x] **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- [x] **Custom Color Scheme**: Enhanced dark theme with blue accent colors
- [x] **Error Handling**: Comprehensive error handling for failed API requests
- [x] **Loading States**: User feedback during data loading
- [x] **Gradient Overlays**: Visual enhancement on card images
- [x] **Sticky Header**: Header remains visible while scrolling

## Video Walkthrough

**Note: please be sure to show the unique URL for each detailed view**

Here's a walkthrough of implemented required features:

[🎥 **Watch Video Walkthrough**](https://www.loom.com/share/5323ef7390f14882bf150c414b8cc6c3?sid=694e2583-ab54-47a5-aa4f-338a0b634d79)

<div>
    <a href="https://www.loom.com/share/24332ff6f5fa4af28d47a92265ea32c1?sid=2977ac45-fc7a-4b04-a0ff-ed3d72e8c0e9">
      <p>SuperHero Hub - Web103 Project Walkthrough - Watch Video</p>
    </a>

</div>


## Features Breakdown

### Superheroes Displayed:
1. **Superman** - DC Comics (Age: 35, Location: Metropolis)
2. **Spider-Man** - Marvel Comics (Age: 23, Location: New York City)
3. **Batman** - DC Comics (Age: 42, Location: Gotham City)
4. **Wonder Woman** - DC Comics (Age: 5000, Location: Themyscira/Washington D.C.)
5. **Iron Man** - Marvel Comics (Age: 48, Location: Malibu/New York City)
6. **The Flash** - DC Comics (Age: 29, Location: Central City)

### Technical Implementation:
- **Frontend**: Vanilla HTML, CSS, JavaScript with PicoCSS framework
- **Backend**: Node.js with Express server
- **Data**: Static JSON data served via REST API
- **Routing**: Express routing for both main page and detail views
- **Styling**: PicoCSS dark theme with custom enhancements
- **Build Tool**: Vite for development and production builds

### API Endpoints:
- `GET /` - Homepage with superhero cards
- `GET /gifts` - API endpoint returning all superhero data
- `GET /gifts/:id` - Detail page for specific superhero (e.g., `/gifts/1` for Superman)

## Notes

### Challenges Encountered:
1. **Server Configuration**: Initial issues with Express routing and static file serving were resolved by properly importing and configuring the gifts router.

2. **PicoCSS Integration**: Balancing PicoCSS defaults with custom styling required careful use of CSS variables and specificity.

3. **Responsive Design**: Creating a layout that works well on both desktop and mobile required CSS Grid and media queries.

4. **Data Structure Migration**: Converting from generic "gifts" to superhero-specific data (powers, universe, age, location, story) while maintaining API compatibility.

### Additional Context:
The app successfully demonstrates modern web development practices including:
- Separation of concerns (client/server architecture)
- RESTful API design
- Responsive web design principles
- Progressive enhancement with JavaScript
- Modern CSS features (Grid, Flexbox, CSS Variables)
- Error handling and user experience considerations

## License

Copyright 2025 Justin Huang

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
