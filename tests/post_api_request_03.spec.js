
//Load Playwright module
const{test, expect} = require('@playwright/test')
const{ faker } = require('@faker-js/faker')
const{ DateTime } = require('Luxon')

// Write a test
test('Create POST api request using dynamic request body',async({request})=>{

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);

    const checkINDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');

    
    // create post API request
    const postAPIResponse = await request.post('/booking',{
        data:{
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkINDate,
                "checkout": checkOutDate
            },
            "additionalneeds": "super bowls"
        }
    })

   const postAPIResponseBody= await postAPIResponse.json();
   console.log(postAPIResponseBody);
   
   // Validate status code
   expect(postAPIResponse.ok()).toBeTruthy();
   expect(postAPIResponse.status()).toBe(200);

   // Validate JSON api response
   expect(postAPIResponseBody.booking).toHaveProperty("firstname",firstName)
   expect(postAPIResponseBody.booking).toHaveProperty("lastname",lastName)
  
   // Validate nested api response
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin",checkINDate)
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout",checkOutDate)

})



