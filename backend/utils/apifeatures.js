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
}

module.exports = ApiFeatures;