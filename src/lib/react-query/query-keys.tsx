import { text } from "stream/consumers"

export const treesKeys = {
    list: () => ['trees'],
    detail: (id: string) => ['trees', id],
}

export const suggestionsKeys = {
    list: () => ['suggestions'],
}

export const dashboardKeys = {
    text: () => ['dashboard'],
    analysis: (years: number) => ['dashboard', 'analysis', years],
}



