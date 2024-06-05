import { Text } from "@/components/ui/text"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col bg-white">
            <div className="flex justify-start items-center p-2 border bottom-1">
                <Text size="sm" weight="bold" variant="primary">My App</Text>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    )
}