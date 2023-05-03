import ytdl from 'ytdl-core';


export async function retriveYTData(videoUrl) {
    try {
        let info = await ytdl.getInfo(videoUrl);
        let infoThumbnail = await ytdl.getBasicInfo(videoUrl);
        let options = createOptions(filterAndSort(info.formats));
        return {title:infoThumbnail.videoDetails.title,value: (filterAndSort(info.formats)), thumbnail: infoThumbnail.videoDetails.thumbnails[0].url, options: options };
    }
    catch (error) {
        return { value: undefined };
    }
}



function filterAndSort(arr) {
    const filteredArr = arr.filter(obj => obj.hasVideo && obj.hasAudio);
    filteredArr.sort((a, b) => a.qualityLabel - b.qualityLabel);
    return filteredArr.sort((a, b) => {
        const qualityA = parseInt(a.qualityLabel);
        const qualityB = parseInt(b.qualityLabel);
        return qualityB - qualityA;
    });
}

function createOptions(Arr) {
    let NArr = [];
    Arr.forEach(element => {
        NArr.push(element.mimeType.split(';')[0].split('/')[1] + ' ' + element.qualityLabel);
    });
    return NArr
}
