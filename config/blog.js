const base = "http://192.168.0.7:8080";

const hrefs = {
    getPostById: {
        default: {
            description : "Normal Page",
            url: new URL("/blog/id/5cbabc97f459ce1386f3e80d", base).href,
            method: "get",
            data: {},
            expected : true
        },
        wrongId: {
            description : "The Id param is wrong",
            url: new URL("/blog/id/6cbabc97f459ce1386f3e80d", base).href,
            method: "get",
            data: {},
            expected : false
        },
        noId: {
            description : "No Id Param",
            url: new URL("/blog/id/", base).href,
            method: "get",
            data: {},
            expected : false
        },
    },
    list: {
        default: {
            description : "Normal Page",
            url: new URL('/blog/page/1/pagesize/3', base).href,
            method: "get",
            data: {},
            expected : true
        },
        pageIsTooLarge : {
            description : "Page Number is too large",
            url: new URL('/blog/page/100/pagesize/3', base).href,
            method: "get",
            data: {},
            expected : false
        },
        pageIsNegative : {
            description : "Page Number is NEGATIVE",
            url: new URL('/blog/page/-3/pagesize/3', base).href,
            method: "get",
            data: {},
            expected : false            
        },
        pageIsZero : {
            description : "Page Number is ZERO",
            url: new URL('/blog/page/0/pagesize/3', base).href,
            method: "get",
            data: {},
            expected : false            
        },
        pageIsNotNumber : {
            description : "Page Number is a char",
            url: new URL('/blog/page/xxx/pagesize/10', base).href,
            method: "get",
            data: {},
            expected : false            
        },
        pagesizeIsNotNumber : {
            description : "Pagesize is a char",
            url: new URL('/blog/page/1/pagesize/xxx', base).href,
            method: "get",
            data: {},
            expected : false            
        }
    },
    create : {
        default : {
            description:"Create a new post",
            url : new URL('/blog', base).href,
            method : "post",
            data : {
                title:"X WINDOW AND WAYLAND",
                content:[
                  {"type":"list", "record":["item1","item2"]},
                  {"type" : "text", "record" : "This is a test #2"},
                  {"type" : "image" , "record" : {"url" : "dog.jpg", "alt":"this is a puppy"}}
                 ]
             },
             expected : true
        }
    }
}

module.exports = hrefs;