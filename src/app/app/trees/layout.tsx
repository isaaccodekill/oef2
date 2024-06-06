import MainAppLayout from "../shared-components/main-app-layout";

export default function TreesLayout({ children }: { children: React.ReactNode }) {
    return (
            <MainAppLayout>
                {children}
            </MainAppLayout>
    )
}