var mirror = {
    interval: 60000,
}
var isInitTable = false;
var classListCustom = [{
        isMirrName: true
    },
    {
        className: 'update-time'
    },
    {
        className: 'sync-status'
    },
    {
        className: 'mirror-size'
    },
    {
        isHelp: true
    }
]

// 帮助文档
var mirrorHelpList = {
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

// 兼容IE8
var statusMap = new Map();
statusMap.set("success", "同步成功");
statusMap.set("failed", "同步失败");
statusMap.set("syncing", "同步中...");
statusMap.set("presyncing", "同步预处理");
statusMap.set("paused", "暂停同步");
statusMap.set("disabled", "停止同步");

// 添加筛选状态数组
var selectedStatuses = ['success', 'syncing', 'failed'];

// 添加排序状态
var sortConfig = {
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

    // 监听复选框变化
    $('.filter-option input[type="checkbox"]').on('change', function () {
        const value = $(this).val();
        if (this.checked) {
            if (!selectedStatuses.includes(value)) {
                selectedStatuses.push(value);
            }
        } else {
            selectedStatuses = selectedStatuses.filter(status => status !== value);
        }
    });

    // 在 document ready 时添加筛选图标点击事件
    $('.filter-icon').on('click', function (e) {
        e.stopPropagation();
        const filterPopup = $('.filter-popup');
        const icon = $(this);
        const iconPos = icon.offset();
        const iconHeight = icon.outerHeight();

        filterPopup.css({
            display: 'block',
            top: iconPos.top + iconHeight + 5,
            left: iconPos.left - 50 // 调整位置使弹窗居中于图标
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
    // 首先移除 frontmatter
    content = content.replace(/^---[\s\S]*?---/, '').trim();
    
    // 替换变量和特殊标记
    content = content
        .replace(/{{http_protocol}}/g, 'https://mirror.iscas.ac.cn')
        .replace(/{{mirror}}/g, '/mirror')  
        .replace(/{{enable_checksum}}/g, '')
        .replace(/\{\{[^}]+\}\}/g, '') 
        .replace(/\$r/g, '');  
    
    // 基本的 Markdown 语法转换
    return content
        // 代码块
        .replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>')
        // 行内代码
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        // 标题
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        // 列表
        .replace(/^\s*[-*+]\s+(.*)$/gm, '<li>$1</li>')
        // 段落
        .replace(/^(?!<[h|l|p|u])(.*$)/gm, '<p>$1</p>')
        // 链接
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        // 强调
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // 清理空段落
        .replace(/<p>\s*<\/p>/g, '');
}

// 添筛选表格函数
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

function compare(p) {
    return function (m, n) {
        var a = m[p];
        var b = n[p];
        return a.localeCompare(b);
    }
}

mirror.update = function update() {
    // 取出tunasync同步工具的数据，进行json解析并更新首页的表格
    $.get("./syncstatus.json", function (data) {
        var dataTmp = data.slice(0)
        dataTmp.sort(compare('name'));
        !isInitTable && createdynamicDom(dataTmp.length, dataTmp);
        for (var i = 0, n = dataTmp.length; i < n; i++) {
            var job = dataTmp[i];
            var updateClass = "." + job.name.replaceAll(/\./g, '') + ".update-time";
            var statusClass = "." + job.name.replaceAll(/\./g, '') + ".sync-status";
            var sizeClass = "." + job.name.replaceAll(/\./g, '') + ".mirror-size";
            $(updateClass).html(job.last_update.substring(0, 19));
            $(statusClass).html(statusMap.get(job.status));
            $(sizeClass).html(job.size);
        }
        // 更新数据后应用前的筛选条
        filterTable();
    });
}

function createdynamicDom(colCount, data) {
    isInitTable = true;
    var tobodyDom = document.querySelector('#distro-table tbody');
    for (var i = 0; i < colCount; i++) {
        var tr = document.createElement('tr');
        tr.className = i % 2 == 0 ? 'odd' : 'even';
        var job = data[i];
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            if (classListCustom[j].className === 'sync-status') {
                var button = document.createElement('button');
                var statusClass = '';
                switch (job.status) {
                    case 'success':
                        statusClass = 'success';
                        break;
                    case 'failed':
                        statusClass = 'failed';
                        break;
                    case 'syncing':
                        statusClass = 'syncing';
                        break;
                    default:
                        statusClass = 'other';
                }
                button.className = job.name.replaceAll(/\./g, '') + ' sync-status ' + statusClass;
                button.textContent = statusMap.get(job.status);
                td.appendChild(button);
            } else if (classListCustom[j].isMirrName) {
                td.innerHTML = `<a href="${job.name}">${job.name}</a>`;
            } else if (classListCustom[j].className) {
                td.className = job.name.replaceAll(/\./g, '') + ' ' + classListCustom[j].className;
            } else if (classListCustom[j].isHelp) {
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
    this.update();
    // 定时刷新，同时需使用定时脚本：
    setInterval(function () {
        this.update();
    }.bind(this), this.interval);
}

// 修改排序表格函数
function sortTable(column, direction) {
    const tbody = $('#distro-table tbody');
    const rows = tbody.find('tr').toArray();

    rows.sort((a, b) => {
        let aValue, bValue;

        if (column === 'update-time') {
            aValue = $(a).find('.update-time').text();
            bValue = $(b).find('.update-time').text();
            // 日期比较
            return direction === 'asc' ?
                new Date(aValue) - new Date(bValue) :
                new Date(bValue) - new Date(aValue);
        }
        return 0;
    });

    // 重新添加排序后的行
    tbody.empty();
    rows.forEach(row => tbody.append(row));

    // 保持奇偶行的样式
    rows.forEach((row, index) => {
        $(row).removeClass('odd even').addClass(index % 2 === 0 ? 'odd' : 'even');
    });
}



function replaceVariables(text, mirrorPath) {
    if (typeof text !== 'string') return text;
    
    return text
        .replace(/{{http_protocol}}/g, 'https://mirror.iscas.ac.cn')
        .replace(/{{mirror}}/g, mirrorPath)
        .replace(/{{enable_checksum}}/g, '')
        .replace(/\{\{[^}]+\}\}/g, '')
        .replace(/\$r/g, ''); // 移除所有的$r
}