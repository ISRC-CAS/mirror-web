from github import Github
import os

# 你的 GitHub 访问令牌
token = ''

# 初始化 Github 对象
g = Github(token)

# GitHub 仓库信息
owner = 'mirrorz-org'
repo_name = 'mirrorz-help'

# 获取仓库对象
repo = g.get_repo(f'{owner}/{repo_name}')

# 本地文件夹路径
local_folder = 'file'

# 确保本地文件夹存在
if not os.path.exists(local_folder):
    os.makedirs(local_folder)

# 递归下载文件
def download_files(path, local_path):
    for item in path:
        if item.type == "dir":
            # 创建目录
            local_dir = os.path.join(local_path, item.name)
            if not os.path.exists(local_dir):
                os.makedirs(local_dir)
            # 递归下载子目录中的文件
            download_files(item.get_contents(), local_dir)
        elif item.type == "file":
            # 下载文件
            local_file_path = os.path.join(local_path, item.name)
            contents = item.decoded_content
            with open(local_file_path, 'wb') as file:
                file.write(contents)
            print(f'文件已保存到：{local_file_path}')

# 开始下载
download_files(repo.get_contents('/contents'), local_folder)