/*
Conversion Modes 
Define the different conversion modes here with conversion functions included
*/
export const modes = [
    {
        value: 'mm_in',
        scales: [{
            unit: 'mm',
            name: 'Milimeters',
            func: function toMilimeters(inch) {
                return inch * 25.4;
            }
        },
        {
            unit: 'in',
            name: 'inches',
            func: function toInches(mm) {
                return mm / 25.4;
            }
        }],
    },
    {
        value: 'lbs_kg',
        scales: [{
            unit: 'lbs',
            name: 'Pounds',
            func: function toPounds(kg) {
                return kg / 0.45359237;
            }
        },
        {
            unit: 'kg',
            name: 'Kilograms',
            func: function toKilograms(lbs) {
                return lbs * 0.45359237;
            }
        }],
    },
    {
        value: 'lbs_kg_N',
        scales: [{
            unit: 'lbs',
            name: 'Pounds',
            func: function toPounds(kg) {
                return kg / 0.45359237;
            }
        },
        {
            unit: 'kg',
            name: 'Kilograms',
            func: function toKilograms(lbs) {
                return lbs * 0.45359237;
            }
        },
        {
            unit: 'N',
            name: 'Newtons',
            func: function toNewtons() {
                return 0;
            }

        }],
    },
]