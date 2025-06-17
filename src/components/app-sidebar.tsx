import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:bg-chart-3/10 px-4 data-active:bg-chart-3/10!" size="lg" isActive>
                <Link href="/" className="space-x-2">
                  <i className="fa-regular fa-home fa-lg"></i>
                  <span className="text-base">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {/* <Button variant="outline" size="icon" className="rounded-full absolute right-0 "> */}
        {/*   <i className="fa-regular fa-bars fa-lg" /> */}
        {/* </Button> */}
      </SidebarContent>
    </Sidebar>)
}
