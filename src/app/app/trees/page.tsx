import TreesClientLayout from './components/trees-client-layout';
import ClientProviders from '@/app/app/client-providers';

export default function TreesPage() {
    return (
        <ClientProviders>
            <TreesClientLayout/>
        </ClientProviders>
    )
}