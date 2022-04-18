export class TestLinkPage {

    selectLink(type : number) {
        if ( type == 360 )
            return testLinks360;
        else
            return testLinks;
    }

}

// normal video link
const testLinks = 'https://www.youtube.com/watch?v=lHMlLCMkuPE';


// 360 video link
const testLinks360 = 'https://www.youtube.com/watch?v=hNAbQYU0wpg';