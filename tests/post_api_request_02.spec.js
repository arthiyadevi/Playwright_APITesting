//Load Playwright module
const{test,expect} = require('@playwright/test')
const bookingAPIRequestBody = require('../test-data/post_request_body.json')

// Write a test
test('Create POST api request using static request body',async({request})=>{
    
    // create post API request
    const postAPIResponse = await request.post('/booking',{
        data:bookingAPIRequestBody
    })

   const postAPIResponseBody= await postAPIResponse.json();
   console.log(postAPIResponseBody);
   
   // Validate status code
   expect(postAPIResponse.ok()).toBeTruthy();
   expect(postAPIResponse.status()).toBe(200);

   // Validate JSON api response
   expect(postAPIResponseBody.booking).toHaveProperty("firstname","Arthi")
   expect(postAPIResponseBody.booking).toHaveProperty("lastname","Thiru")
  
   // Validate nested api response
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01",)
   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01")

})