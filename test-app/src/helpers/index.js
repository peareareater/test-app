export function parseItem(rawItem) {
    return {
        id: rawItem.id,
        title: rawItem.title,
        thumbnail: rawItem.thumbnail,
        url: rawItem.url,
        author: rawItem.author,
    }
}