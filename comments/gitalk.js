(() => {
    const loadComments = async () => {
      if (typeof Gitalk === "undefined") {
        setTimeout(loadComments, 100);
      } else {
        const container = document.getElementById('gitalk-container');
        if (!container) {
          return;
        }
        const path = container.getAttribute("data-path");
        const gitalk = new Gitalk(Object.assign({
            id: path, // 直接使用路径作为 id
            // id: container.getAttribute("data-path-hash"), // 使用 hash 作为 ID
            path: path,
        }, {
          clientID: 'Ov23liT5HoQG2tAJp6oZ',
          clientSecret: 'd49c4c5d517c99a8155d033acc2b0c04c4c713a5',
          repo: "hexo_gitalk",
          owner: "1398listener",
          admin: ["1398listener"],
          distractionFreeMode: false,
        }));
  
        gitalk.render('gitalk-container');
      }
    };
  
    window.loadComments = loadComments;
    window.addEventListener('pjax:success', () => {
      window.loadComments = loadComments;
    });
  })();
  