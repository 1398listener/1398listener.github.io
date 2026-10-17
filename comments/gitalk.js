(() => {
    const initialized = new WeakSet();
    let editorObserver;

    const protectEditor = (container) => {
      // Gitalk 1.x 与 Grammarly 的 DOM 注入存在失焦冲突。
      // 只为评论编辑器关闭扩展注入，不拦截键盘或中文输入法事件。
      const update = () => {
        container.querySelectorAll('.gt-header-textarea').forEach((editor) => {
          editor.setAttribute('data-gramm', 'false');
          editor.setAttribute('data-gramm_editor', 'false');
          editor.setAttribute('data-enable-grammarly', 'false');
        });
      };
      editorObserver?.disconnect();
      editorObserver = new MutationObserver(update);
      editorObserver.observe(container, { childList: true, subtree: true });
      update();
    };

    const loadComments = async () => {
      if (typeof Gitalk === "undefined") {
        setTimeout(loadComments, 100);
      } else {
        const container = document.getElementById('gitalk-container');
        if (!container || initialized.has(container)) {
          return;
        }
        protectEditor(container);
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
        initialized.add(container);
      }
    };
  
    window.loadComments = loadComments;
    window.addEventListener('pjax:before', () => {
      editorObserver?.disconnect();
    });
    window.addEventListener('pjax:success', () => {
      window.loadComments = loadComments;
    });
  })();
  
