import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
    SidebarFooter,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/AuthStore"
import { useNavigate } from "react-router-dom"
import { Link2, Info, LogOut, LogIn, User, ShieldCheck } from "lucide-react"

const AppSidebar = () => {
    const { getUsername, isAdmin, logout, token } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <h1 className="text-lg font-bold">URL Shortener</h1>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigate('/urls')} className="gap-2">
                            <Link2 className="w-4 h-4" />
                            URLs
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigate('/about')} className="gap-2">
                            <Info className="w-4 h-4" />
                            About
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-2 bg-gray-200">
                <SidebarSeparator className="mb-2" />
                <SidebarMenu>
                    {token && (
                        <SidebarMenuItem>
                            <div className="px-2 py-3 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">{getUsername()}</span>
                                </div>
                                {isAdmin() && (
                                    <span className="mt-4 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full w-fit flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" />
                                        Admin
                                    </span>
                                )}
                            </div>
                        </SidebarMenuItem>
                    )}

                    <SidebarSeparator />

                    {token ? (
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={handleLogout} className="gap-2 text-red-500 hover:text-red-600">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ) : (
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={() => navigate('/login')} className="gap-2">
                                <LogIn className="w-4 h-4" />
                                Login
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar