let isoinfo = []; // 全局变量存储数据

function loadIsoInfo() {
    return $.ajax({
        url: './isoinfo.json',
        dataType: 'json',
        success: function(data) {
            isoinfo = data;
        },
        error: function(xhr, status, error) {
            console.error('Error loading isoinfo.json:', error);
        }
    });
}

// 通用的内容展示组件
function ContentViewer(category, title) {
    this.category = category;
    this.title = title;
    
    // 渲染内容
    this.render = function() {
        // 显示容器
        $('.os-container').show();
        
        // 更新侧边栏标题
        $('.sidebar-header').text(`${this.title}列表`);
        
        // 从isoinfo中筛选数据并按字母表顺序排序
        const filteredData = isoinfo
            .filter(item => item.category === this.category)
            .sort((a, b) => a.distro.localeCompare(b.distro, 'en', { sensitivity: 'base' }));
        
        // 生成左侧菜单
        const menuHtml = filteredData.map(item => 
            `<li><a href="#" data-distro="${item.distro}">${item.distro}</a></li>`
        ).join('');
        
        $('.os-menu').html(menuHtml);
        
        // 默认显示第一个内容
        if (filteredData.length > 0) {
            this.showContent(filteredData[0]);
            $('.os-menu a:first').addClass('active');
        }
        
        // 绑定菜单点击事件
        $('.os-menu a').off('click').on('click', (e) => {
            e.preventDefault();
            const distro = $(e.currentTarget).data('distro');
            const selectedItem = filteredData.find(item => item.distro === distro);
            
            $('.os-menu a').removeClass('active');
            $(e.currentTarget).addClass('active');
            
            this.showContent(selectedItem);
        });
    };
    
    // 显示具体内容
    this.showContent = function(data) {
        $('.os-title').text(data.distro);
        
        const cardsHtml = data.urls.map(item => `
            <div class="os-card">
                <h3>${item.name}</h3>
                <a href="https://mirrors.tuna.tsinghua.edu.cn${item.url}" class="download-btn">下载</a>
            </div>
        `).join('');
        
        $('.os-list').html(cardsHtml);
    };
}

jQuery(document).ready(function($) {
    mirror.init();
    loadIsoInfo(); // 预加载数据
    
    // Tab切换功能
    function switchTab(tabId) {
        // 移除所有tab按钮的active类
        $('.tab-btn').removeClass('active');
        // 为当前点击的按钮添加active类
        $(`.tab-btn[data-tab="${tabId}"]`).addClass('active');
        
        // 隐藏所有面板
        $('.tab-panel').removeClass('active');
        // 显示对应的面板
        $(`#${tabId}-panel`).addClass('active');
        
        // 当点击镜像列表tab时显示content和footer并重置下拉框
        if (tabId === 'iso') {
            $('.content, #footer').show();
            $('.os-container').hide(); // 隐藏组件容器
            // 重置下拉框文本为默认值
            $('.dropdown-toggle').html('获取安装镜像<span class="arrow"></span>');
        }
    }
    
    // Tab按钮点击事件
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        switchTab(tabId);
    });
    
    // 下拉菜单交互
    $('.dropdown-toggle').click(function(e) {
        e.preventDefault();
        const dropdown = $(this).parent('.dropdown');
        dropdown.toggleClass('active');
        
        // 点击其他地方关闭下拉菜单
        $(document).one('click', function closeMenu(e) {
            if (!$(e.target).closest('.dropdown').length) {
                dropdown.removeClass('active');
            }
        });
    });

    // 防止点击下拉菜单时关闭
    $('.dropdown-menu').click(function(e) {
        e.stopPropagation();
    });

    // 下拉菜单项点击处理
    $('.dropdown-item').click(function(e) {
        e.preventDefault();
        const type = $(this).data('type');
        const text = $(this).text();
        
        // 确保数据已加载
        if (isoinfo.length === 0) {
            loadIsoInfo().then(() => {
                showSelectedContent(type, text);
            });
        } else {
            showSelectedContent(type, text);
        }
        
        // 关闭下拉菜单
        $(this).closest('.dropdown').removeClass('active');
    });
    
    // 显示选中的内容
    function showSelectedContent(type, text) {
        let viewer;
        switch (type) {
            case 'os':
                viewer = new ContentViewer('os', '操作系统');
                break;
            case 'apps':
                viewer = new ContentViewer('app', '应用软件');
                break;
            case 'fonts':
                viewer = new ContentViewer('font', '字体');
                break;
        }
        
        if (viewer) {
            $('.content, #footer').hide();
            viewer.render();
        }
    }
    
    // 默认选中第一个tab（镜像列表）
    $('.tab-btn[data-tab="iso"]').click();
});
