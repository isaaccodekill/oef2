import { text } from "stream/consumers"

export const treesKeys = {
    list: () => ['trees'],
    detail: (id: string) => ['trees', id],
}

export const suggestionsKeys = {
    list: (input: string) => ['suggestions', input],
}

export const dashboardKeys = {
    text: () => ['dashboard'],
    analysis: () => ['dashboard', 'analysis'],
}



