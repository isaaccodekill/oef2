
import { Text } from "@/components/ui/text"

export default function ProfilePage() {
    return <>
        <div className="px-10 py-10">
            <Text size="2xl" weight="bold">Hello John Doe</Text>
            <div className="mt-10">
                <Text size="md" weight="bold">Your Address is</Text>
                <div className="border border-1 px-10 py-10 mt-4">
                    <Text size="md">22, Karimu Kotun Street </Text>
                </div>
            </div>
        </div>
    </>
}