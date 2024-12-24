// 镜像配置对象，设置更新间隔时间为60秒
let mirror = {
    interval: 60000,
}
// 表格初始化状态标志
let isInitTable = false;
// 定义表格列的配置
let classListCustom = [
    { isMirrName: true },      // 镜像名称列
    { className: 'update-time' }, // 更新时间列
    { className: 'sync-status' }, // 同步状态列
    { className: 'mirror-size' }, // 镜像大小列
    { isHelp: true }           // 帮助文档列
]

// 帮助文档
let mirrorHelpList = {
    'alpine': 'https://help.mirrors.cernet.edu.cn/alpine/?mirror=ISRC-ISCAS',
    'anthon': 'https://help.mirrors.cernet.edu.cn/anthon/?mirror=ISRC-ISCAS',
    'aosp-monthly': 'https://help.mirrors.cernet.edu.cn/aosp-monthly/?mirror=ISRC-ISCAS',
    'arch4edu': 'https://help.mirrors.cernet.edu.cn/arch4edu/?mirror=ISRC-ISCAS',
    'archlinux': 'https://help.mirrors.cernet.edu.cn/archlinux/?mirror=ISRC-ISCAS',
    'archlinuxarm': 'https://help.mirrors.cernet.edu.cn/archlinuxarm/?mirror=ISRC-ISCAS',
    'archlinuxcn': 'https://help.mirrors.cernet.edu.cn/archlinuxcn/?mirror=ISRC-ISCAS',
    'archriscv': 'https://help.mirrors.cernet.edu.cn/archriscv/?mirror=ISRC-ISCAS',
    'armbian': 'https://help.mirrors.cernet.edu.cn/armbian/?mirror=ISRC-ISCAS',
    'bioconductor': 'https://help.mirrors.cernet.edu.cn/bioconductor/?mirror=ISRC-ISCAS',
    'blackarch': 'https://help.mirrors.cernet.edu.cn/blackarch/?mirror=ISRC-ISCAS',
    'centos': 'https://help.mirrors.cernet.edu.cn/centos/?mirror=ISRC-ISCAS',
    'centos-vault': 'https://help.mirrors.cernet.edu.cn/centos-vault/?mirror=ISRC-ISCAS',
    'ceph': 'https://help.mirrors.cernet.edu.cn/ceph/?mirror=ISRC-ISCAS',
    'chef': 'https://help.mirrors.cernet.edu.cn/chef/?mirror=ISRC-ISCAS',
    'clojars': 'https://help.mirrors.cernet.edu.cn/clojars/?mirror=ISRC-ISCAS',
    'CPAN': 'https://help.mirrors.cernet.edu.cn/CPAN/?mirror=ISRC-ISCAS',
    'CRAN': 'https://help.mirrors.cernet.edu.cn/CRAN/?mirror=ISRC-ISCAS',
    'CTAN': 'https://help.mirrors.cernet.edu.cn/CTAN/?mirror=ISRC-ISCAS',
    'cygwin': 'https://help.mirrors.cernet.edu.cn/cygwin/?mirror=ISRC-ISCAS',
    'dart-pub': 'https://help.mirrors.cernet.edu.cn/dart-pub/?mirror=ISRC-ISCAS',
    'debian': 'https://help.mirrors.cernet.edu.cn/debian/?mirror=ISRC-ISCAS',
    'debian-cd': 'https://help.mirrors.cernet.edu.cn/debian-cd/?mirror=ISRC-ISCAS',
    'debian-security': 'https://help.mirrors.cernet.edu.cn/debian-security/?mirror=ISRC-ISCAS',
    'debiancn': 'https://help.mirrors.cernet.edu.cn/debiancn/?mirror=ISRC-ISCAS',
    'docker-ce': 'https://help.mirrors.cernet.edu.cn/docker-ce/?mirror=ISRC-ISCAS',
    'eclipse': 'https://help.mirrors.cernet.edu.cn/eclipse/?mirror=ISRC-ISCAS',
    'elasticstack': 'https://help.mirrors.cernet.edu.cn/elasticstack/?mirror=ISRC-ISCAS',
    'elpa': 'https://help.mirrors.cernet.edu.cn/elpa/?mirror=ISRC-ISCAS',
    'elrepo': 'https://help.mirrors.cernet.edu.cn/elrepo/?mirror=ISRC-ISCAS',
    'epel': 'https://help.mirrors.cernet.edu.cn/epel/?mirror=ISRC-ISCAS',
    'erlang-solutions': 'https://help.mirrors.cernet.edu.cn/erlang-solutions/?mirror=ISRC-ISCAS',
    'fdroid': 'https://help.mirrors.cernet.edu.cn/fdroid/?mirror=ISRC-ISCAS',
    'fedora': 'https://help.mirrors.cernet.edu.cn/fedora/?mirror=ISRC-ISCAS',
    'flutter': 'https://help.mirrors.cernet.edu.cn/flutter/?mirror=ISRC-ISCAS',
    'FreeBSD': 'https://help.mirrors.cernet.edu.cn/FreeBSD/?mirror=ISRC-ISCAS',
    'gentoo': 'https://help.mirrors.cernet.edu.cn/gentoo/?mirror=ISRC-ISCAS',
    'gentoo-portage': 'https://help.mirrors.cernet.edu.cn/gentoo-portage/?mirror=ISRC-ISCAS',
    'gentoo-portage-prefix': 'https://help.mirrors.cernet.edu.cn/gentoo-portage-prefix/?mirror=ISRC-ISCAS',
    'github-release': 'https://help.mirrors.cernet.edu.cn/github-release/?mirror=ISRC-ISCAS',
    'gitlab-ce': 'https://help.mirrors.cernet.edu.cn/gitlab-ce/?mirror=ISRC-ISCAS',
    'gitlab-runner': 'https://help.mirrors.cernet.edu.cn/gitlab-runner/?mirror=ISRC-ISCAS',
    'gnu': 'https://help.mirrors.cernet.edu.cn/gnu/?mirror=ISRC-ISCAS',
    'grafana': 'https://help.mirrors.cernet.edu.cn/grafana/?mirror=ISRC-ISCAS',
    'hackage': 'https://help.mirrors.cernet.edu.cn/hackage/?mirror=ISRC-ISCAS',
    'homebrew-bottles': 'https://help.mirrors.cernet.edu.cn/homebrew-bottles/?mirror=ISRC-ISCAS',
    'influxdata': 'https://help.mirrors.cernet.edu.cn/influxdata/?mirror=ISRC-ISCAS',
    'julia': 'https://help.mirrors.cernet.edu.cn/julia/?mirror=ISRC-ISCAS',
    'julia-releases': 'https://help.mirrors.cernet.edu.cn/julia-releases/?mirror=ISRC-ISCAS',
    'kali': 'https://help.mirrors.cernet.edu.cn/kali/?mirror=ISRC-ISCAS',
    'kicad': 'https://help.mirrors.cernet.edu.cn/kicad/?mirror=ISRC-ISCAS',
    'kodi': 'https://help.mirrors.cernet.edu.cn/kodi/?mirror=ISRC-ISCAS',
    'kubernetes': 'https://help.mirrors.cernet.edu.cn/kubernetes/?mirror=ISRC-ISCAS',
    'lineage-rom': 'https://help.mirrors.cernet.edu.cn/lineage-rom/?mirror=ISRC-ISCAS',
    'linuxmint': 'https://help.mirrors.cernet.edu.cn/linuxmint/?mirror=ISRC-ISCAS',
    'llvm-apt': 'https://help.mirrors.cernet.edu.cn/llvm-apt/?mirror=ISRC-ISCAS',
    'lxc-images': 'https://help.mirrors.cernet.edu.cn/lxc-images/?mirror=ISRC-ISCAS',
    'mageia': 'https://help.mirrors.cernet.edu.cn/mageia/?mirror=ISRC-ISCAS',
    'manjaro': 'https://help.mirrors.cernet.edu.cn/manjaro/?mirror=ISRC-ISCAS',
    'mariadb': 'https://help.mirrors.cernet.edu.cn/mariadb/?mirror=ISRC-ISCAS',
    'mongodb': 'https://help.mirrors.cernet.edu.cn/mongodb/?mirror=ISRC-ISCAS',
    'msys2': 'https://help.mirrors.cernet.edu.cn/msys2/?mirror=ISRC-ISCAS',
    'mysql': 'https://help.mirrors.cernet.edu.cn/mysql/?mirror=ISRC-ISCAS',
    'nix': 'https://help.mirrors.cernet.edu.cn/nix/?mirror=ISRC-ISCAS',
    'nix-channels': 'https://help.mirrors.cernet.edu.cn/nix-channels/?mirror=ISRC-ISCAS',
    'nixos-images': 'https://help.mirrors.cernet.edu.cn/nixos-images/?mirror=ISRC-ISCAS',
    'nodejs-release': 'https://help.mirrors.cernet.edu.cn/nodejs-release/?mirror=ISRC-ISCAS',
    'OpenBSD': 'https://help.mirrors.cernet.edu.cn/OpenBSD/?mirror=ISRC-ISCAS',
    'OpenMediaVault': 'https://help.mirrors.cernet.edu.cn/OpenMediaVault/?mirror=ISRC-ISCAS',
    'opensuse': 'https://help.mirrors.cernet.edu.cn/opensuse/?mirror=ISRC-ISCAS',
    'openwrt': 'https://help.mirrors.cernet.edu.cn/openwrt/?mirror=ISRC-ISCAS',
    'packman': 'https://help.mirrors.cernet.edu.cn/packman/?mirror=ISRC-ISCAS',
    'pkgsrc': 'https://help.mirrors.cernet.edu.cn/pkgsrc/?mirror=ISRC-ISCAS',
    'postmarketOS': 'https://help.mirrors.cernet.edu.cn/postmarketOS/?mirror=ISRC-ISCAS',
    'proxmox': 'https://help.mirrors.cernet.edu.cn/proxmox/?mirror=ISRC-ISCAS',
    'qt': 'https://help.mirrors.cernet.edu.cn/qt/?mirror=ISRC-ISCAS',
    'qubesos': 'https://help.mirrors.cernet.edu.cn/qubesos/?mirror=ISRC-ISCAS',
    'raspberry-pi-os-images': 'https://help.mirrors.cernet.edu.cn/raspberry-pi-os-images/?mirror=ISRC-ISCAS',
    'raspberrypi': 'https://help.mirrors.cernet.edu.cn/raspberrypi/?mirror=ISRC-ISCAS',
    'raspbian': 'https://help.mirrors.cernet.edu.cn/raspbian/?mirror=ISRC-ISCAS',
    'repo-ck': 'https://help.mirrors.cernet.edu.cn/repo-ck/?mirror=ISRC-ISCAS',
    'riscv-toolchains': 'https://help.mirrors.cernet.edu.cn/riscv-toolchains/?mirror=ISRC-ISCAS',
    'rocky': 'https://help.mirrors.cernet.edu.cn/rocky/?mirror=ISRC-ISCAS',
    'ros': 'https://help.mirrors.cernet.edu.cn/ros/?mirror=ISRC-ISCAS',
    'ros2': 'https://help.mirrors.cernet.edu.cn/ros2/?mirror=ISRC-ISCAS',
    'rpmfusion': 'https://help.mirrors.cernet.edu.cn/rpmfusion/?mirror=ISRC-ISCAS',
    'rudder': 'https://help.mirrors.cernet.edu.cn/rudder/?mirror=ISRC-ISCAS',
    'rustup': 'https://help.mirrors.cernet.edu.cn/rustup/?mirror=ISRC-ISCAS',
    'solus': 'https://help.mirrors.cernet.edu.cn/solus/?mirror=ISRC-ISCAS',
    'termux': 'https://help.mirrors.cernet.edu.cn/termux/?mirror=ISRC-ISCAS',
    'trisquel': 'https://help.mirrors.cernet.edu.cn/trisquel/?mirror=ISRC-ISCAS',
    'ubuntu': 'https://help.mirrors.cernet.edu.cn/ubuntu/?mirror=ISRC-ISCAS',
    'ubuntu-cloud-images': 'https://help.mirrors.cernet.edu.cn/ubuntu-cloud-images/?mirror=ISRC-ISCAS',
    'ubuntu-ports': 'https://help.mirrors.cernet.edu.cn/ubuntu-ports/?mirror=ISRC-ISCAS',
    'virtualbox': 'https://help.mirrors.cernet.edu.cn/virtualbox/?mirror=ISRC-ISCAS',
    'voidlinux': 'https://help.mirrors.cernet.edu.cn/voidlinux/?mirror=ISRC-ISCAS'
}

// 镜像状态映射表
let statusMap = new Map();
statusMap.set("success", "同步成功");
statusMap.set("failed", "同步失败");
statusMap.set("syncing", "同步中...");
statusMap.set("presyncing", "同步预处理");
statusMap.set("paused", "暂停同步");
statusMap.set("disabled", "停止同步");

// 添加筛选状态数组
let selectedStatuses = ['success', 'syncing', 'failed'];

// 添加排序状态
let sortConfig = {
    column: null,
    direction: 'asc'
};

// 在 document ready 时初始化筛选器
$(document).ready(function () {
    // 遍历 mirrorHelpList
    Object.keys(mirrorHelpList).forEach(function (mirrorName) {
        // 检查是否有帮助内容
        if (mirrorHelpList[mirrorName]) {
            // 从本地获取对应的 MDX 内容
            fetch(`/file/${mirrorName}.mdx`)
                .then(response => response.text())
                .then(content => {
                    // 渲染 MDX 内容到悬浮窗
                    renderMirrorHelp(mirrorName, content);
                })
                .catch(error => {
                    console.error(`Failed to load help content for ${mirrorName}:`, error);
                    // 加载失败时显示错误信息
                    renderMirrorHelp(mirrorName, '加载帮助文档失败，请稍后重试。');
                });
        }
    });


    // 为筛选选项中的复选框添加变化事件监听器
    $('.filter-option input[type="checkbox"]').on('change', function () {
        // 获取当前复选框的值
        const value = $(this).val();
        
        // 如果复选框被选中
        if (this.checked) {
            // 检查该状态是否已经在选中状态数组中
            if (!selectedStatuses.includes(value)) {
                // 如果不在，则添加到选中状态数组中
                selectedStatuses.push(value);
            }
        } else {
            // 如果复选框被取消选中，则从数组中移除该状态
            // 使用 filter 方法创建新数组，只保留不等于当前值的状态
            selectedStatuses = selectedStatuses.filter(status => status !== value);
        }
    });
     // 为筛选图标添加点击事件监听器
    $('.filter-icon').on('click', function (e) {
        // 阻止事件冒泡，防止点击图标时触发文档的点击事件
        e.stopPropagation();
        
        // 获取筛选弹出框元素
        const filterPopup = $('.filter-popup');
        // 获取当前被点击的图标元素
        const icon = $(this);
        // 获取图标的位置信息
        const iconPos = icon.offset();
        // 获取图标的高度
        const iconHeight = icon.outerHeight();
         // 设置弹出框的CSS样式
        filterPopup.css({
            display: 'block',                    // 显示弹出框
            top: iconPos.top + iconHeight + 5,   // 设置弹出框的垂直位置（图标底部下方5像素）
            left: iconPos.left - 50              // 设置弹出框的水平位置（向左偏移50像素使其居中）
        });
    });

    // 点击其他地方时隐藏筛选器
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.filter-popup, .filter-icon').length) {
            $('.filter-popup').hide();
        }
    });

    // 监听确定按钮点击
    $('.filter-confirm').on('click', function () {
        filterTable();
        $('.filter-popup').hide();
    });

    // 添加排序图标点击事件
    $('.sort-icon').on('click', function () {
        const column = $(this).data('sort');
        const $icon = $(this);

        // 切换排序方向
        if (sortConfig.column === column) {
            sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            sortConfig.column = column;
            sortConfig.direction = 'asc';
        }

        // 更新图标状态
        $('.sort-icon').removeClass('asc desc');
        $icon.addClass(sortConfig.direction);

        // 执行排序
        sortTable(column, sortConfig.direction);

      
    });


    

});

// 添加渲染帮助内容的函数
function renderMirrorHelp(mirrorName, content) {
    // 找到对应镜像的悬浮窗内容区域
    const tooltipContent = $(`.help-container[data-mirror="${mirrorName}"] .tooltip-content`);
    if (tooltipContent.length) {
        // 设置基本的帮助文档结构
        tooltipContent.html(`
            <div class="loading-container markdown-body">
                <main>
                    <h3>${mirrorName} 软件仓库镜像使用帮助</h3>
                    <div class="help-content">
                        ${formatMarkdown(content)}
                    </div>
                </main>
            </div>
        `);
    }
}

// 修改 Markdown 格式化函数
function formatMarkdown(content) {
    // 移除 frontmatter
    content = content.replace(/^---[\s\S]*?---/, '').trim();
    
    // 替换变量和特殊标记
    content = content
        .replace(/{{http_protocol}}/g, 'https://mirror.iscas.ac.cn')
        .replace(/{{mirror}}/g, '/mirror')  
        .replace(/{{enable_checksum}}/g, '')
        .replace(/\{\{[^}]+\}\}/g, '') 
        .replace(/\$r/g, '')
        .trim();

    // 先处理代码块，避免干扰其他转换
    content = content.replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>');
    
    // 将内容按行分割处理
    const lines = content.split('\n');
    let html = '';
    let inList = false;
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue; // 跳过空行
        
        // 处理引用块
        if (line.startsWith('>')) {
            const quoteContent = line.slice(1).trim();
            if (quoteContent) {
                html += `<blockquote>${quoteContent}</blockquote>\n`;
            }
            continue;
        }
        
        // 处理标题
        if (line.startsWith('###')) {
            html += `<h3>${line.slice(3).trim()}</h3>\n`;
            continue;
        }
        if (line.startsWith('##')) {
            html += `<h2>${line.slice(2).trim()}</h2>\n`;
            continue;
        }
        if (line.startsWith('#')) {
            html += `<h1>${line.slice(1).trim()}</h1>\n`;
            continue;
        }
        
        // 处理列表项
        if (line.match(/^\s*[-*+]\s/)) {
            if (!inList) {
                html += '<ul>\n';
                inList = true;
            }
            html += `<li>${line.replace(/^\s*[-*+]\s/, '').trim()}</li>\n`;
            continue;
        } else if (inList) {
            html += '</ul>\n';
            inList = false;
        }
        
        // 处理行内格式
        line = line
            .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        // 处理普通段落
        if (!line.startsWith('<')) {
            html += `<p>${line}</p>\n`;
        } else {
            html += line + '\n';
        }
    }
    
    if (inList) {
        html += '</ul>\n';
    }
    
    return html.trim();
}

// 筛选表格函数
function filterTable() {
    const rows = $('#distro-table tbody tr');

    rows.each(function () {
        const statusButton = $(this).find('.sync-status');
        const status = getStatusFromButton(statusButton);

        if (status && selectedStatuses.includes(status)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// 从状态按钮获取状态值
function getStatusFromButton(button) {
    const classList = button.attr('class').split(' ');
    if (classList.includes('success')) return 'success';
    if (classList.includes('failed')) return 'failed';
    if (classList.includes('syncing')) return 'syncing';
    return '';
}

// 比较函数，用于数组排序
function compare(p) {
    return function (m, n) {
        let a = m[p];
        let b = n[p];
        return a.localeCompare(b); // 按字符串比较
    }
}

mirror.update = function update() {
    // 获取同步状态数据并更新表格
    $.get("./syncstatus.json", function (data) {
        let dataTmp = data.slice(0)  // 创建数据副本
        dataTmp.sort(compare('name')); // 按名称排序
        // 首次加载时创建表格DOM
        !isInitTable && createdynamicDom(dataTmp.length, dataTmp);
        
        // 遍历更新每个镜像的状态
        for (let i = 0, n = dataTmp.length; i < n; i++) {
            let job = dataTmp[i];
            // 构造各列的类名选择器
            let updateClass = "." + job.name.replaceAll(/\./g, '') + ".update-time";
            let statusClass = "." + job.name.replaceAll(/\./g, '') + ".sync-status";
            let sizeClass = "." + job.name.replaceAll(/\./g, '') + ".mirror-size";
            // 更新显示内容
            $(updateClass).html(job.last_update.substring(0, 19));
            $(statusClass).html(statusMap.get(job.status));
            $(sizeClass).html(job.size);
        }
        filterTable(); // 应用筛选条件
    });
}

function createdynamicDom(colCount, data) {
    isInitTable = true;
    let tobodyDom = document.querySelector('#distro-table tbody');
    
    // 创建表格行
    for (let i = 0; i < colCount; i++) {
        let tr = document.createElement('tr');
        tr.className = i % 2 == 0 ? 'odd' : 'even';  // 设置奇偶行样式
        let job = data[i];
        
        // 创建每行的5个单元格
        for (let j = 0; j < 5; j++) {
            let td = document.createElement('td');
            
            // 同步状态列：创建状态按钮
            if (classListCustom[j].className === 'sync-status') {
                let button = document.createElement('button');
                // 根据同步状态设置不同的样式类
                let statusClass = '';
                switch (job.status) {
                    case 'success': statusClass = 'success'; break;
                    case 'failed': statusClass = 'failed'; break;
                    case 'syncing': statusClass = 'syncing'; break;
                    default: statusClass = 'other';
                }
                button.className = `${job.name.replaceAll(/\./g, '')} sync-status ${statusClass}`;
                button.textContent = statusMap.get(job.status);
                td.appendChild(button);
            } 
            // 镜像名称列：创建链接
            else if (classListCustom[j].isMirrName) {
                td.innerHTML = `<a href="${job.name}">${job.name}</a>`;
            }
            // 其他带类名的列
            else if (classListCustom[j].className) {
                td.className = job.name.replaceAll(/\./g, '') + ' ' + classListCustom[j].className;
            }
            // 帮助列：添加帮助图标和提示
            else if (classListCustom[j].isHelp) {
                if (mirrorHelpList[job.name]) {
                    td.innerHTML = `
                        <div class="help-container" data-mirror="${job.name}">
                            <span class="help-text">${job.name} 使用帮助</span>
                            <div class="help-icon">?
                                <div class="help-tooltip">
                                    <div class="tooltip-content"></div>
                                </div>
                            </div>`;
                } else {
                    td.textContent = 'N/A';
                }
            }
            tr.appendChild(td);
        }
        tobodyDom.appendChild(tr);
    }
}

mirror.init = function () {
    this.update();  // 初始更新
    // 设置定时刷新
    setInterval(function () {
        this.update();
    }.bind(this), this.interval);
}

// 表格排序函数
function sortTable(column, direction) {
    const tbody = $('#distro-table tbody');
    const rows = tbody.find('tr').toArray();  // 获取所有表格行并转换为数组

    rows.sort((a, b) => {
        let aValue, bValue;

        // 处理更新时间列的排序
        if (column === 'update-time') {
            // 获取更新时间单元格的文本内容
            aValue = $(a).find('.update-time').text();
            bValue = $(b).find('.update-time').text();
            
            // 根据排序方向进行日期比较
            // asc: 升序，从早到晚
            // desc: 降序，从晚到早
            return direction === 'asc' ?
                new Date(aValue) - new Date(bValue) :
                new Date(bValue) - new Date(aValue);
        }
        return 0;
    });

    // 清空表格并重新插入排序后的行
    tbody.empty();
    rows.forEach(row => tbody.append(row));

    // 重新应用奇偶行的样式类
    rows.forEach((row, index) => {
        $(row).removeClass('odd even').addClass(index % 2 === 0 ? 'odd' : 'even');
    });
}

// 变量替换函数：替换帮助文本中的模板变量
function replaceletiables(text, mirrorPath) {
    // 检查输入是否为字符串
    if (typeof text !== 'string') return text;
    
    return text
        // 替换协议和域名
        .replace(/{{http_protocol}}/g, 'https://mirror.iscas.ac.cn')
        // 替换镜像路径
        .replace(/{{mirror}}/g, mirrorPath)
        // 移除校验和占位符
        .replace(/{{enable_checksum}}/g, '')
        // 移除所有其他双大括号模板变量
        .replace(/\{\{[^}]+\}\}/g, '')
        // 移除所有的$r变量
        .replace(/\$r/g, '');
}