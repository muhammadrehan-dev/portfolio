import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://muhammadrehan-dev.me/sitemap.xml',
    host: 'https://muhammadrehan-dev.me',
  }
}
