#!/bin/sh
# npm run build

cp -r ../dist/.  ./dist/

daoUsername='dk_dev@dookay.com'
daoPassword='DK100001'
repoName='hedan_front_h5'

# 获取当前的git commit id:
commitid=$(git rev-parse --short HEAD )

# 获取当前的branch
branch=$(git symbolic-ref --short -q HEAD)

# 获取时间戳
date="$(date +%Y%m%d%H%M%S)"

# 组合imageName
image='daocloud.io/dookay_team/'${repoName}':'${branch}'-'${commitid}'-'${date}

echo ${image}

docker login daocloud.io -p ${daoPassword} -u ${daoUsername}

docker build -f ./Dockerfile  . -t ${image}

echo '执行push'

docker push ${image}

echo '执行结束'

rm -rf ./dist

