import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
    title: 'Santiago Escobar | Software Engineer',
    description:
         'Computer engineer passionate about building digital experiences and exploring new technologies'
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps){
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    );
}