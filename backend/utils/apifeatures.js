class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
        // console.log(keyword); to check what comes in this variable as output
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
        
        //Removing some fields for category 
        const removeFields =["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key]);

        // Filter for price and rating 
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);


        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
        



    }
}

module.exports = ApiFeatures;