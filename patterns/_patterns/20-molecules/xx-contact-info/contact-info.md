This pattern is for displaying contact information using the address tag
(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)


Required:
  contact_info - the contact information [string or array]


  If contact_info is a string, it will be displayed as-is

  Otherwise, contact info can be an array of objects (à la flexible content/paragraphs). If so, each array item is checked for a key of "address", "email", or "phone" and the correct sub-template is displayed, using the value as the data. Addresses can also have an optional google_map boolean field, which causes them to link to the search results for that address on google maps




Example contact_info string:
  contact_info: "Phone: (555) 867-5309 <br> Email: address@server.com"

Example contact_info array:
  contact_info:
  - address: 1600 Amphitheatre Pkwy, <br>Mountain View, CA 94043
  - address: 1600 Amphitheatre Pkwy, <br>Mountain View, CA 94043
    google_map: true
  - phone: '123-456-7890'
  - phone: '123-456-7899'
  - email: 'someone@gmail.com'
  - email: 'someone@rootid.com'
