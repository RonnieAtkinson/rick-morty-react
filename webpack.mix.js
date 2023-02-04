const historyApiFallback = require('connect-history-api-fallback');

// Require mix
const mix = require('laravel-mix');

// Set options
mix.options({
    // Tells webpack not to try and resolve external css resources (eg. images)
    processCssUrls: false,
});
mix.setPublicPath('./public');

// Generate sourcemaps for all our files to make debugging easier
mix.sourceMaps();

// Copy static files
mix.copy('./client/index.html', './public');

// Compile SCSS files
mix.sass('./client/styles/index.scss', './public/css');

// Compile Typescript files
mix.ts('./client/index.tsx', './public/js').react();

// Sync changes to the browser
mix.browserSync({
    server: {
        baseDir: './public',
        middleware: [historyApiFallback()],
    },
});

// Only show system notification on errors and first compile
mix.disableSuccessNotifications();
