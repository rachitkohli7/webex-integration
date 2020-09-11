export const extractToken = (url) => {
    if (url) {
        const indexOfAccessToken = url.indexOf('code');
        if (indexOfAccessToken >= 0) {
            const splittedStringEqualsTo = url.split('=');
            if (splittedStringEqualsTo.length > 0) {
                const splittedStringAnd = splittedStringEqualsTo[1].split('&');
                return splittedStringAnd[0];
            }
            
        }
    }
    return null;
}