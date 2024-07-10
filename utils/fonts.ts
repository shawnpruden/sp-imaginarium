import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

export const fonts = {
  inter: inter.className,
  roboto_mono: roboto_mono.className,
};
