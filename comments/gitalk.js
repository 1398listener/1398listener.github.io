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
        // GitHub 标签最多 50 个字符。短路径保留旧 ID，长路径使用主题生成的哈希。
        const commentId = path.length <= 50
          ? path
          : container.getAttribute("data-path-hash");
        const gitalk = new Gitalk(Object.assign({
            id: commentId,
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
  
