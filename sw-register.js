navigator.serviceWorker && navigator.serviceWorker.register('/sw.js?v=' + new Date().getTime()).then(function() {
    navigator.serviceWorker.addEventListener('message', function(a) {
        console.log("sw: %o", a);
        if ('sw.update' === a.data) {
            $.message({
                title: "更新成功",
                message: "",
                type: "success"
            });
        }
    })
});
