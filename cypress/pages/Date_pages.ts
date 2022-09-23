export class DatePage {

    selectDate(date : string) {
        if( date == 'today' )
            return today;
        else if( date == 'month' )
            return thisYear + '-' + thisMonth;
        else
            return 'test';
    }

}

const today = '2022-09-23_2';
const thisYear = '2022';
const thisMonth = '08';
const thisDay = '19';