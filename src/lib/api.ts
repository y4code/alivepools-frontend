export const API_HOST = 'https://alivepools.siri.ink/api';
export const getFetcher = (url: string) => fetch(url).then((r) => r.json());
export const postFetcher = (url: string, data: any) => fetch(
    url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
}).then((r) => r.json());

export const getDomain = (website: string) => postFetcher(`${API_HOST}/domain`, { website });
