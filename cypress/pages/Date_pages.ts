export class DatePage {

    selectDate(date : string) {
        if( date == 'today' )
            return today;
        else
            return 'test';
    }

}

const today = '2022-06-24';
const thisYear = '2022';
const thisMonth = '4';
const thisDay = '19';