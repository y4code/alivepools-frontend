import axios from "axios";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());
// export const fetcher = (url: string) => axios.get(url).then((r) => r.data);
export const API_HOST = 'https://alivepools.siri.ink/api';
