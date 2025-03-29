import { ReactNode } from "react";

interface PageProps {
    children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
                {children}
            </div>
        </div>
    );
}; 