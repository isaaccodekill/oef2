export default {
    // ... your existing Next.js configuration options ...

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i, // Match all SVG files
            issuer: /\.[jt]sx?$/,
            resourceQuery: { not: [/url/] }, // Exclude SVGs imported as URLs
            use: ['@svgr/webpack'],
        });

        return config;
    }
};