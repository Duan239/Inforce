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
import { Link2, Info, LogOut, LogIn } from "lucide-react"

const AppSidebar = () => {
    const { getUserId, getUsername, isAdmin, login, logout, token } = useAuthStore();
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


                    {token && <SidebarMenuItem>
                        <p className=''>Username: {getUsername()}</p>
                        {isAdmin() && <p className=''>Admin</p>}
                    </SidebarMenuItem>
                    }
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