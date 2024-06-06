import { Text } from "@/components/ui/text"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen overflow-hidden flex flex-col bg-white">
            <div className="flex justify-start items-center p-4 border bottom-1 gap-2">
                <img src="/nature.png" className="h-[20px]" />
                <Text size="md" weight="semibold" variant="primary">Tree Tracker</Text>
            </div>
            <div className="flex-grow overflow-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    )
}

export default Layout