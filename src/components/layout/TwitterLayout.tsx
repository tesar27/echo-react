import { Sidebar } from "./Sidebar";
import { MainFeed } from "./MainFeed";
import { RightSidebar } from "./RightSidebar";

export function TwitterLayout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto flex">
        <Sidebar />
        <MainFeed />
        <RightSidebar />
      </div>
    </div>
  );
}
