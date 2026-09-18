import { Outlet } from "react-router-dom";
import { FluidBackground } from "../fluid/FluidBackground";

export const Layout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <FluidBackground />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};
