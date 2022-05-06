export class StringPage {

    selectString(str : string) {
        if( str == 'panoramas30' )
            return panoramas30;
        else if( str == 'video360' )
            return video360;
        else
            return others;

    }

}


const panoramas30 = 'Upload 30 panoramas';
const video360 = 'Add 360 video';
const others = 'created by Cypress';