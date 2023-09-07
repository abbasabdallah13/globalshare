import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId:'b06qz9pc',
    dataset:'production',
    apiVersion: '2022-02-01',
    useCdn: false,
    token: 'skr6gkXzxHOGsdOq5slUlV5gWt3ZEeKEeQRAx3jTeBg3xCWONUMnsV4CcD1OSzCHd77vVgrPKOCdkhZBBjU5uWgBuyrTdXvCPmynRjvmSa6xHddtlDdcSXZAlCfmktODXprpfiAhZcyiIO8zOYMk2Z2LWcrR55h7izRZ006qdEfaEbbcj9A0'
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);