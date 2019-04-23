# httpDebuger
This is a tiny CLI tool used for debug errors in the development of REST API

For long I had used chrome extension to debug API, but it is incomfortable to send request and anysis response in the browser, so I write this tiny tool. Its function,until now,is enough to me, and I might extend its function like printing response header in the future. It use ***axios*** as its core. 

In this tool, ***request.js*** is the core file, and the scenarios we design for debuging our app is saved in the files under the folder named ***config***. ***config.js*** in root folder has a field called *judged*, and it is the boolean field your server returned to know if the operation you just give it has successed.

In CLI, you can run it as follow


`node request <section> <command> <argument>`


***seciton*** is the name of your file in the config folder, it is expected that you put different part of your APIs into different file to organize them in a clean way.

***command*** is the keys of herfs object, each object maps to a series of test of one API. It is insensitive to Upper or Lower case.

```javascript
const base = "http://127.0.0.1:8080";
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
    ...
}    
```
You'd better directly modify the ***blog.js*** to your scenarios, and copy and modify it to generate other sections.

***argument*** is the key of each test object, here, *default* , *wrongid* and *noid*. It defaults to '*default*'. If argument is '*loop*', it will run all the test of this API block in loop way(one by one).

In the section file
- *description* is used to describe the API
- *url* is the API itself, here you can use etheir URL object or directly write your api url
- *method* is the http verb of your API
- *data* is an object, which will sent to server in *POST PUT ...* request
- *expected* is a boolean, and if this API test will return *false* in you design, fill in *false*, and vice versa. 

Okay, that's all.
