/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are defined and that the URL is not empty', function() {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.null();
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined and that the name is not empty', function() {
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.null();
            }
         });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it("the menu element is hidden by default", function() {
            //检查body 的 class  menu-hidden 存在即可
            expect($("body").hasClass('menu-hidden')).toBeTruthy();

         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it("the menu changes visibility when the menu icon is clicked", function() {
            //trigger() 方法触发被选元素的指定事件类型
            $(".menu-icon-link").trigger('click');
            expect($("body").hasClass("menu-hidden")).toBeFalsy();
            //再点击    
            $(".menu-icon-link").trigger('click');
            expect($(body).hasClass('menu-hidden')).toBeTruthy();

          });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         //loadFeed 这个函数它其实封装的就是一个 ajax 请求，ajax 请求是异步的
         //异步就是不知道什么时候执行完成，在这个例子里就是不知道什么时候拿到数据做测试，
         //jasmine 才会封装一个 done 函数，
         //当 ajax 请求完成是调用 done(看 loadFeed 源码是在 ajax success 的函数调用回调函数，即 done 函数），
         //这时候 jasmine 异步请求完成了，可以进行下一步操作了
         var originalTimeout;
         beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
            loadFeed(0, done);
         });

         it("when the loadFeed function is called and completes its work", function(done) {
            expect($('.feed').children().length).toBeGreaterThan(0);
         });

         afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
         });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        /* loadFeed 函数，第一个参数是源的索引，第二个参数是一个回调函数
           思路是利用 loadFeed 分别调用两个不同的源，记录下来两次文章列表的内容，
           比较这两次结果，如果不同就测试通过了
        */
        var originalTimeout,
            oldFeed;
        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

            loadFeed(0 , function() {
                oldFeed = ('.feed').html()；
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it("a new feed is loaded", function(done) {
            expect($('.feed').html()).not.toEqual(oldFeed);
        });

        afterEach(function() {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });       
    });
}());
