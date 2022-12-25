import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

console.log('publicRuntimeConfig.backUrl', publicRuntimeConfig.backUrl)

// export const backUrl = process.env.NODE_ENV === 'production' ? '' : process.env.NEXT_PUBLIC_BACK_URL;
export const backUrl = process.env.NODE_ENV === 'production' ? publicRuntimeConfig.backUrl : publicRuntimeConfig.backUrl;