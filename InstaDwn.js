import got from "got";

async function downloader(obj) {
    let html;
    try {
        html = await got.get(`https://www.instagram.com/p/${obj.id}/`)
        html.on('error', () => {
            html = false;
        });
        html = html ? html.body : false;
    } catch (e) {
        html = false;
    }
    if (!html) return { error: 'ErrorCouldntFetch' };
    if (!html.includes('application/ld+json')) return { error: 'ErrorEmptyDownload' };
    let single, multiple = [], postInfo = JSON.parse(html.split('script type="application/ld+json"')[1].split('">')[1].split('</script>')[0]);
    let refinedObj = { headline: postInfo.headline, videos: postInfo.video, images: postInfo.image };
    // console.log(pickUrl(refinedObj));
    return pickUrl(refinedObj);
}

function getId(url) {
    const id = url.match(/\/reel\/([^\s/]+)/);
    if (id == null) {
        let id = url.match(/\/p\/([^\s/]+)/);
        return { id: id[1] }
    } else {
        return { id: id[1] }
    }

}

function pickUrl(data) {
    const { images, videos, headline } = data;
    const imageUrls = [];
    const videoContentUrls = [];
    images.forEach(img => {
        imageUrls.push(img.url)
    });
    videos.forEach(vid => {
        videoContentUrls.push({ videoUrl: vid.contentUrl,videoImg: vid.thumbnailUrl});
    });
    return { imageUrl: imageUrls, videoContentUrl: videoContentUrls, headline: headline.replace(/[^a-zA-Z0-9\s]+/g, '').replace(/\s+/g, ' ').trim() };
}


export default async function instaDownloader(url) {
    let blogData = await downloader(getId(url));
    return convertToStandard(blogData);
}


function convertToStandard(data){

    let finalData=[];
console.log(data);

    data.imageUrl.forEach(img => {
        let _tmpData = {
            title: data.headline,
            imageUrl: img,
            video:false,
            videoUrl:'None'
          }
         finalData.push(_tmpData);
    });

    data.videoContentUrl.forEach(vid =>{
        let _tmpData = {
            title: data.headline,
            imageUrl: vid.videoImg,
            video:true,
            videoUrl:vid.videoUrl
          }
         finalData.push(_tmpData);
    });
    return finalData;
}