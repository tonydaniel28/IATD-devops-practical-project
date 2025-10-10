import { isValidDateString, wrapString } from "../src/utilities";

test("failing test", () => {
expect(1).toBe(2);
});

test("wrapString: wrap single word over two lines", () => {
    expect(wrapString("Long", 3)).toBe("Lo-\nng");
});

test("wrapString: wrap multiple words over two lines", () => {
    expect(wrapString("Too long", 4)).toBe("Too\nlong");
});

test("wrapString: wrap complex sentence", () => {
    expect(wrapString("This is a complex sentence that needs to be wrapped", 6)).toBe("This\nis a\ncompl-\nex se-\nntence\nthat\nneeds\nto be\nwrapp-\ned");
});

// PLACE TESTS FOR isValidDateString UNDER HERE

//Test for invalid string
test("isValidateString: invalid string", () => {
    expect(isValidDateString("x1/111998")).toBe(false); //invalid 
    expect(isValidDateString("11/1-/1998")).toBe(false); // -ve month
    expect(isValidDateString("x1/11/19$$")).toBe(false); //invalid year
    expect(isValidDateString("01012000")).toBe(false); //without /
    expect(isValidDateString("01/01/2000 ")).toBe(false); //space at the end
    expect(isValidDateString("thisisnotadate")).toBe(false); //string value
    expect(isValidDateString("15062025")).toBe(false); //correct date with no /
    expect(isValidDateString("15-06-2025")).toBe(false); //correct date with wrong separator
})

test("Placeholder: ", () => {
    expect(1).toBe(1);
})

// Test for the wrong amount of "date segments" (see comments in utilities.js for more info)
test("isValidateString: wrong amount of date segment", () => {
    expect(isValidDateString("32")).toBe(false); // fewer segments
    expect(isValidDateString("00/11/2000/2001")).toBe(false); //more segments then expected
    expect(isValidDateString(" ")).toBe(false); // no segments - blank or space
    expect(isValidDateString("30/02")).toBe(false); // fewer segments
    expect(isValidDateString("//")).toBe(false); //no values, just segments
})

// Test for wrong number of digits in the day
test("isValidateString: wrong number of digits in the day", () => {
    expect(isValidDateString("00/11/2000")).toBe(false); //date <0 in a month
    expect(isValidDateString("-1/10/2000")).toBe(false); // -ve date value
    expect(isValidDateString("30/02/2000")).toBe(false); //30 days in Feb
    expect(isValidDateString("31/04/2000")).toBe(false); //31 days in April
})

// Test for wrong number of digits in the month
test("isValidateString: wrong number of digits in the month", () => {
    expect(isValidDateString("01/00/2000")).toBe(false); // month  = 0
    expect(isValidDateString("01//2000")).toBe(false); // no digits in a month
    expect(isValidDateString("01/13/2000")).toBe(false); // month > 12
    expect(isValidDateString("01/-1/2000")).toBe(false); // -ve month value
    expect(isValidDateString("01/130/2000")).toBe(false); // 3 digits month
})

// Test for wrong number of digits in the year
test("isValidateString: wrong number of digits in the year", () => {
    expect(isValidDateString("01/00/200")).toBe(false); // digits < 4
    expect(isValidDateString("01/13/20002")).toBe(false); // digits > 4
    expect(isValidDateString("01/-1/")).toBe(false); // no dogits
    expect(isValidDateString("01/00/-200")).toBe(false); // 4 digits but with special char
})

// Test for day outside of month's number of days
test("isValidateString: wrong number of digits in the day", () => {
    expect(isValidDateString("30/02/2000")).toBe(false); //30 days in Feb
    expect(isValidDateString("31/04/2000")).toBe(false); //31 days in April
    expect(isValidDateString("32/01/2000")).toBe(false); // date >31 days in a month
})

// Test for month greater than 12
test("isValidateString: month greater than 12", () => {
    expect(isValidDateString("01/21/2000")).toBe(false); // month > 12
    })

// Test for day <= 0
test("isValidateString: day <= 0", () => {
    expect(isValidDateString("-1/13/2000")).toBe(false); // date -ve
    expect(isValidDateString("00/13/2000")).toBe(false); // date zero
    })