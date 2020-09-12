# National Day of Civic Hacking Project: Connecting Social Services by Expanding Open Referral Infrastructure
## [OpenSTL](https://openstl.org/) and the [St. Louis Regional Data Alliance](https://stldata.org/)

### The Problem: 
Social Services --- providing food, housing, legal assistance, healthcare, and a variety of other essential supports --- are scattered across hundreds of nonprofits in the St. Louis region alone. Coordinating these services is an incredibly complicated task, particularly because it is often hard to know what organization provides what service to whom. To tackle this problem, a variety of resource directories are created --- some more formal like [2-1-1](http://211helps.org), others from grassroots groups like [StartHereSTL ](https://www.startherestl.org/)--- that often hold pieces of the overall puzzle, but don't currently connect to each other. This leads to fragmentation, confusion, and ultimately people falling through the cracks because they don't know a critical service exists.

### Open Referral: 
[Open Referral](https://openreferral.org/), which was originally sponsored by Code for America, seeks to tackle the problem by building open data standards and tools that make "resource data" easier to share, integrate, and serve as a powerful common platform for transparent and effective social service delivery. Over the past decade, the Open Referral Initiative has attempted to tackle the fragmentation of resource data by creating data interoperability standards that allow resource data to more easily be shared and aligned across data systems. The Human Service Data Specifications and API protocols (HSDS and HSDA, respectively) are data exchange formats that communities can use to realign institutional efforts around cooperative methods of collecting and distributing resource data.

### The Challenge: 
Open Referral and their partners have created a variety of tools to make resource data sharing and integration easier. However, a number of critical component parts need to be connected to make resource data transformation easier for creators of resource guides, who typically do not have programming skills. This hackathon will attempt to stitch a number of Open Referral tools together into the early stages of a seamless transformation package. Roughly, participants should seek to:

-   Understand how resource data is currently organized in existing directories, including resources from [Legal Services of Eastern Missouri](https://lsem.org/) and [Freeman Health Center in Joplin](https://www.freemanhealth.com/community-resource-directory).

-   Understand existing Open Referral tools that can be leveraged here, including: 

    -   [Human Service Data Specifications](http://docs.openreferral.org/en/latest/hsds/reference/)

    -   [HSDS Transformer Tool](https://github.com/openreferral/hsds-transformer)

    -   [HSDS Validator](https://github.com/openreferral/hsds-validator)

    -   [HSDS AirTable Template](https://airtable.com/universe/expwt9yr65lFGUJAr/open-referral-social-services-directory-v20)

-   Seek to stitch together these tools to make them easier for existing resource guides to transform them into the HSDS format:

    -   Define necessary standards for existing resource guide spreadsheets

    -   Create method for resource guides to run through the HSDS Transformer/Validator and automate an upload into the AirTable Template --- ideally with an easy-to-use front end that resource directory creators can self-service

    -   Demonstrate this transformation using existing directories

    -   Document and contribute to the [Open Referral GitHub](https://github.com/openreferral)
