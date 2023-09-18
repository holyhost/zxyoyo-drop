/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export'
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"]
    },
    images:{
        domains: ['pojun.top']
    },
    webpack(config) {
        config.experiments={
            ...config.experiments,
            topLevelAwait: true
        }
        return config
    }
}

module.exports = nextConfig
