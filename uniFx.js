import instaDownloader from './InstaDwn.js';
import { tictok } from './tictok.js';



export async function UniversalService(url, serviceName) {
    let result = { value: false, data: {}, service: serviceName };
    switch (serviceName) {
        case 'Instagram':
            result.data = await instaDownloader(url);
            result.value = true;
            break;
        case 'Facebook':

            break;
        case 'Tiktok':
            let data = await tictok(url);
            let format = [{
                title: data.title,
                imageUrl: data.thumbnail,
                video: true,
                videoUrl: data.urls
            }];
            result.value = true;
            result.data = format;
            break;
        default:
            break;
    }
    return result;
}




export function detectService(url) {
    if (/youtube\.com|youtu\.be/.test(url)) {
        return "YouTube";
    } else if (/instagram\.com/.test(url)) {
        return "Instagram";
    } else if (/facebook\.com/.test(url)) {
        return "Facebook";
    } else if (/tiktok\.com/.test(url)) {
        return "Tiktok";
    } else {
        return "Unknown";
    }
}